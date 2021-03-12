<script language="javascript" type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.2.min.js"></script>
<script language="javascript" type="text/javascript">

$(document).ready(
	function () {
  	var inEditMode = Utils.checkPageInEditMode();
  	// Prevent the collapsing of <h2> blocks when in SharePoint's [Edit Mode]
  	if (!inEditMode) {
    	UI.collapseContentHeaders();
    	UI.toggleContentHeaders();
			UI.toggleContentHeaders2();
  	}
	}
);

var UI = {
	collapseContentHeaders:
		function () {
			$('#DeltaPlaceHolderMain h3').each(
				function (index, value) {
					// Collapses all <h3> blocks except for the first encountered
					if (index > 0) {
						$(this).toggleClass('expand').next().show();
					}
				}
			);
			$('#DeltaPlaceHolderMain h2').each(
				function (index, value) {
					// Collapses all <h2> blocks except for the first encountered
					if (index > 0) {
						$(this).toggleClass('expand').nextUntil('h2').slideToggle(100);
					}
				}
			);
		},
	toggleContentHeaders: function () {
		// Toggles the accordion behavior for <h2> regions onClick
		$('#DeltaPlaceHolderMain h2').click(
			function () {
				$(this).toggleClass('expand').nextUntil('h2').filter('h3').each(
					function(index){
						// Collapses all <h3> blocks except for the first encountered
						if (index > 0) {
							$(this).toggleClass('expand').next().show();
						}
					}
				);
				$(this).toggleClass('expand').nextUntil('h2').slideToggle(100);
			}
		);
	},
	toggleContentHeaders2: function () {
		// Toggles the accordion behavior for <h2> regions onClick
		$('#DeltaPlaceHolderMain h3').click(
			function () {
				$(this).toggleClass('expand').next().slideToggle(100);
			}
		);
	}
}

var Utils = {
	checkPageInEditMode: function () {
		var pageEditMode = null;
		var wikiPageEditMode = null;

		// Edit check for Wiki Pages
		if (document.forms[MSOWebPartPageFormName]._wikiPageMode) {
			wikiPageEditMode = document.forms[MSOWebPartPageFormName]._wikiPageMode.value;
		}
		// Edit check for all other pages
		if (document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode) {
			pageEditMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
		}
		// Return the either/or if one of the page types is flagged as in Edit Mode
  	if (!pageEditMode && !wikiPageEditMode) {
    	return false;
    }
    return pageEditMode == "1" || wikiPageEditMode == "Edit";
  }
}
</script>
