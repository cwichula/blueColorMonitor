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

Add-Type -AssemblyName System.Net.HttpListener -ErrorAction SilentlyContinue

$root = $PSScriptRoot
$prefix = "http://localhost:$Port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
} catch {
  Write-Error "Nie udało się uruchomić serwera na porcie $Port. Spróbuj innego portu: -Port 8081. $_"
  exit 1
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

try {
  $ips = [System.Net.Dns]::GetHostAddresses([System.Net.Dns]::GetHostName()) |
    Where-Object { $_.AddressFamily -eq 'InterNetwork' -and $_.ToString() -ne '127.0.0.1' }
  foreach ($ip in $ips) {
    Write-Output "W tej samej sieci Wi-Fi (np. z telefonu):  http://$($ip.ToString()):$Port/   (kamera w przeglądarce zwykle wymaga HTTPS poza localhost - patrz INSTRUKCJE.md)"
  }
} catch {}

Write-Output "Zatrzymanie: Ctrl+C"

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response
  try {
    $path = $request.Url.AbsolutePath
    if ($path -eq '/') { $path = '/index.html' }
    $filePath = Join-Path $root ($path.TrimStart('/'))

    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $contentType = $mime[$ext]
      if (-not $contentType) { $contentType = 'application/octet-stream' }
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $response.ContentType = $contentType
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
