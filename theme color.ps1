function HashToDictionary {
  Param ([Hashtable]$ht)
  $dictionary = New-Object "System.Collections.Generic.Dictionary``2[System.String,System.String]"
  foreach ($entry in $ht.GetEnumerator()) {
    $dictionary.Add($entry.Name, $entry.Value)
  }
  return $dictionary
}

$themepallette = HashToDictionary(
	@{
    "themePrimary" = "#008080";
    "themeLighterAlt" = "#ecffff";
    "themeLighter" = "#d9ffff";
    "themeLight" = "#b3ffff";
    "themeTertiary" = "#5effff";
    "themeSecondary" = "#00a6a6";
    "themeDarkAlt" = "#007373";
    "themeDark" = "#005959";
    "themeDarker" = "#004646";
    "neutralLighterAlt" = "#e7e7e7";
    "neutralLighter" = "#e3e3e3";
    "neutralLight" = "#dadada";
    "neutralQuaternaryAlt" = "#cbcbcb";
    "neutralQuaternary" = "#c2c2c2";
    "neutralTertiaryAlt" = "#bababa";
    "neutralTertiary" = "#d6d6d6";
    "neutralSecondary" = "#474747";
    "neutralPrimaryAlt" = "#2e2e2e";
    "neutralPrimary" = "#333333";
    "neutralDark" = "#242424";
    "black" = "#1c1c1c";
    "white" = "#ededed";
    "primaryBackground" = "#ededed";
    "primaryText" = "#333333";
    "bodyBackground" = "#ededed";
    "bodyText" = "#333333";
    "disabledBackground" = "#efefef";
    "disabledText" = "#f3f3f3";
	"accent" = "#f09609";
	}
)

Add-SPOTheme -Name "Waffles" -Palette $themepallette -IsInverted $false

