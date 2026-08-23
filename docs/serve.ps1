# Prosty serwer statyczny do lokalnego testowania Monitora Światła Niebieskiego.
# Nie wymaga instalacji Pythona ani Node.js - korzysta z .NET wbudowanego w Windows.
#
# Użycie:
#   powershell -ExecutionPolicy Bypass -File serve.ps1
#   powershell -ExecutionPolicy Bypass -File serve.ps1 -Port 8080
#
# Otwórz w przeglądarce: http://localhost:<port>/
# Zatrzymanie: Ctrl+C w tym oknie.

param(
  [int]$Port = 8000
)

$root = $PSScriptRoot
$prefix = "http://localhost:$Port/"

function Get-LanAddresses {
  try {
    return [System.Net.Dns]::GetHostAddresses([System.Net.Dns]::GetHostName()) |
      Where-Object { $_.AddressFamily -eq 'InterNetwork' -and $_.ToString() -ne '127.0.0.1' } |
      ForEach-Object { $_.ToString() }
  } catch { return @() }
}

$lanAddresses = @(Get-LanAddresses)
$lanReachable = $false

# HttpListener only answers the host names it was asked to bind. A prefix of
# "localhost" returns 400 for a request addressed to the machine's IP, so a
# phone on the same Wi-Fi cannot reach it. Binding "+" covers every host name
# but needs an URL ACL, i.e. an elevated shell - so try it, and fall back to
# localhost-only rather than promising an address that will not answer.
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:$Port/")
try {
  $listener.Start()
  $lanReachable = $true
} catch {
  $listener.Close()
  $listener = New-Object System.Net.HttpListener
  $listener.Prefixes.Add($prefix)
  try {
    $listener.Start()
  } catch {
    Write-Error "Nie udało się uruchomić serwera na porcie $Port. Spróbuj innego portu: -Port 8081. $_"
    exit 1
  }
}

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.webmanifest' = 'application/manifest+json'
  '.json' = 'application/json'
  '.png'  = 'image/png'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
}

Write-Output "Serwuję $root"
Write-Output "Otwórz w przeglądarce: $prefix"

if ($lanReachable) {
  foreach ($ip in $lanAddresses) {
    Write-Output "W tej samej sieci Wi-Fi (np. z telefonu):  http://${ip}:$Port/"
  }
  if ($lanAddresses.Count -gt 0) {
    Write-Output "  UWAGA: kamera w przeglądarce zwykle wymaga HTTPS poza localhost, więc na telefonie pomiar może się nie uruchomić - patrz INSTRUKCJE.md."
    Write-Output "  Jeśli telefon nie łączy się w ogóle, przepuść port w zaporze:"
    Write-Output "    New-NetFirewallRule -DisplayName 'Monitor swiatla $Port' -Direction Inbound -Protocol TCP -LocalPort $Port -Action Allow"
  }
} else {
  Write-Output "Dostęp z telefonu: NIEDOSTĘPNY. Serwer nasłuchuje wyłącznie na localhost."
  Write-Output "  Żeby wpuścić telefon z tej samej sieci Wi-Fi, uruchom to okno jako administrator,"
  Write-Output "  albo raz na stałe nadaj uprawnienie (też jako administrator):"
  Write-Output "    netsh http add urlacl url=http://+:$Port/ user=Everyone"
  foreach ($ip in $lanAddresses) {
    Write-Output "  Adres, który wtedy zadziała:  http://${ip}:$Port/"
  }
}

Write-Output "Zatrzymanie: Ctrl+C"

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response
  try {
    $path = $request.Url.AbsolutePath
    if ($path -eq '/') { $path = '/index.html' }
    $filePath = Join-Path $root ($path.TrimStart('/'))

    Write-Output ("{0}  {1}" -f (Get-Date -Format 'HH:mm:ss'), $path)
    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $contentType = $mime[$ext]
      if (-not $contentType) { $contentType = 'application/octet-stream' }
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $response.ContentType = $contentType
      # This is a development server. Anything it caches is a change the
      # developer already made but cannot see, so nothing is ever cached -
      # neither by the browser nor by the service worker's own fetches.
      $response.Headers.Add('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
      $response.Headers.Add('Pragma', 'no-cache')
      $response.Headers.Add('Expires', '0')
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $response.StatusCode = 404
      $notFound = [System.Text.Encoding]::UTF8.GetBytes('404 - nie znaleziono')
      $response.OutputStream.Write($notFound, 0, $notFound.Length)
    }
  } catch {
    $response.StatusCode = 500
  } finally {
    $response.OutputStream.Close()
  }
}
