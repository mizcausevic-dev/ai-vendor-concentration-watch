$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $repoRoot "screenshots"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

foreach ($existingFile in Get-ChildItem -Path $outputDir -Filter "*.png" -ErrorAction SilentlyContinue) {
  Remove-Item $existingFile.FullName -Force
}

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Path,
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets
  )

  $width = 1600
  $height = 900
  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.Color]::FromArgb(7, 17, 29))

  $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(13, 26, 43))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(103, 224, 190), 2)
  $titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(237, 242, 255))
  $bodyBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(159, 176, 207))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(103, 224, 190))

  $fontTitle = New-Object System.Drawing.Font("Georgia", 40, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular)
  $fontFooter = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)

  $rect = New-Object System.Drawing.Rectangle 20, 20, 1560, 820
  $graphics.FillRectangle($bgBrush, $rect)
  $graphics.DrawRectangle($panelPen, $rect)

  $graphics.DrawString("AI Vendor Concentration Watch", $fontSub, $accentBrush, 70, 85)
  $graphics.DrawString($Title, $fontTitle, $titleBrush, 70, 150)
  $graphics.DrawString($Subtitle, $fontBody, $bodyBrush, (New-Object System.Drawing.RectangleF(70, 240, 1380, 110)))

  $y = 360
  foreach ($bullet in $Bullets) {
    $graphics.FillEllipse($accentBrush, 85, $y + 13, 12, 12)
    $graphics.DrawString($bullet, $fontBody, $titleBrush, 110, $y)
    $y += 84
  }

  $graphics.DrawString("Synthetic proof render for README packaging.", $fontFooter, $bodyBrush, 70, 770)
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $graphics.Dispose()
  $bitmap.Dispose()
}

New-ScenarioImage -Path (Join-Path $outputDir "01-overview-proof.png") -Title "Board-facing AI supplier concentration stays visible before one vendor becomes the whole strategy" -Subtitle "This surface turns model lock-in, pricing power, compliance dependency, and fallback weakness into one board-readable supplier-risk map." -Bullets @(
  "Which lanes are over-dependent on one AI provider for product, growth, or compliance execution.",
  "Where switching friction, contract leverage, or platform coupling are weakening negotiating power.",
  "What should be diversified, ring-fenced, ported, negotiated, contained, or escalated next."
)

New-ScenarioImage -Path (Join-Path $outputDir "02-vendor-register-proof.png") -Title "Vendor register keeps each lane, owner, audience, and next move attached" -Subtitle "Every route retains the concentration tier, operating story, accountable owner, and immediate mitigation step." -Bullets @(
  "Each lane stays connected to one owner and one board-facing audience.",
  "Supplier pressure is visible before it turns into another vague platform-risk conversation.",
  "The next corrective move sits next to the lane instead of disappearing into a separate memo."
)

New-ScenarioImage -Path (Join-Path $outputDir "03-concentration-tiers-proof.png") -Title "Concentration tiers show whether lock-in, pricing power, egress friction, or compliance dependency are driving the risk" -Subtitle "The dominant AI supplier weakness remains visible so leadership can reduce the right dependency first." -Bullets @(
  "The blocking issue is explicit instead of implied.",
  "Switching cost, contract exposure, fallback readiness, and platform coupling stay readable at a glance.",
  "Each lane ties to a concrete mitigation step instead of a generic vendor-risk complaint."
)

New-ScenarioImage -Path (Join-Path $outputDir "04-mitigation-posture-proof.png") -Title "Mitigation posture keeps supplier-risk decisions grounded in owners and replaceable spend" -Subtitle "Composite risk score, replaceable spend, and next moves stay grounded in the same operating view." -Bullets @(
  "Diversify, negotiate, ring-fence, port, contain, and escalate decisions stay tied to one owner.",
  "Replaceable spend is visible before the next review cycle.",
  "Boards and operators can see which mitigation motion should move first."
)
