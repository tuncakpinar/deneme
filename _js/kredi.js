var content = '<link href=\"http://www.kredipazari.com/public/affmarketing/styles/affstyles.css\" rel=\"stylesheet\" type=\"text/css\" /><div class=\"kp_snap\"> <link href=\"http://www.kredipazari.com/public/affmarketing/styles/affstyles.css\" rel=\"stylesheet\" type=\"text/css\" />  <form name=\"kp_calc_form\" id=\"kp_calc_form\" action=\"http://www.kredipazari.com/konut-kredisi-basvurusu/\" method=\"get\" target=\"_blank\"> <fieldset> <input type=\"hidden\" name=\"affid\" value=\"1\" /> <input type=\"hidden\" name=\"progid\" value=\"1\" /> <input type=\"hidden\" name=\"bid\" value=\"\" /> <table class=\"kp_calc\" cellpadding=\"0\" cellspacing=\"0\"> <tr> <th width=\"30%\"> Vade</th> <td><input name=\"duration\" type=\"text\" value=\"60\" maxlength=\"5\" class=\"kp_calc\" style=\"text-align:right\" onclick=\"return false\" />&nbsp;ay</td> </tr> <tr> <th>Aylık Faiz Oranı</th> <td><input name=\"IR\" type=\"text\" value=\"1.09\" maxlength=\"5\" class=\"kp_calc\" style=\"text-align:right\" onclick=\"return false\" />&nbsp;%</td> </tr> <tr> <th>Kredi Miktarı</th> <td><input type=\"text\" name=\"creditamount\" value=\"70000\" class=\"kp_calc\" style=\"text-align:right\" onclick=\"return false\" />&nbsp;&#8378;</td> </tr> <tr> <th>Aylık Ödeme</th> <td><input name=\"MT\" type=\"text\" value=\"1,596\" class=\"kp_calc kp_emphasize kp_red\" style=\"border-style:none; text-align:right;\" readonly=\"readonly\" /><span class=\"kp_red\">&nbsp;&#8378;</span></td> </tr> <tr> <td></td> <td style=\"text-align:left;\"> <input type=\"button\" value=\"Hesapla\" name=\"calculate\" onclick=\"displayshort2(this); return false;\"/> &nbsp; &nbsp; <input type=\"submit\" value=\"Başvur\" name=\"kp_compare\" /></td> </tr> <tfoot> <tr style=\"display:none\"> <td colspan=\"2\" style=\"text-align:left\"> Kaynak: <a href=\"http://www.kredipazari.com/\" target=\"_blank\" rel=\"nofollow\">http://www.kredipazari.com</a> </td> </tr> </tfoot> </table> </fieldset> </form> </div>';
var BSMV = 0.00;
var kp_calc_form;


function kredipazari_displayCalc(){
	window.onerror = true;
	document.write(content);
	kp_calc_form = document.getElementById('kp_calc_form');
}


// Supporting JavaScript functions
/*
	IN:
		NUM - the number to format
		decimalNum - the number of decimal places to format the number to
		bolLeadingZero - true / false - display a leading zero for
										numbers between -1 and 1
		bolParens - true / false - use parenthesis around negative numbers
		bolCommas - put commas as number separators.
 
	RETVAL:
		The formatted number!
*/
function formatnumber(num,decimalNum,bolLeadingZero,bolParens,bolCommas) { 
        if (isNaN(parseInt(num))) return "--";

	var tmpNum = num;
	var iSign = num < 0 ? -1 : 1;		// Get sign of number
	
	// Adjust number so only the specified number of numbers after
	// the decimal point are shown.
	tmpNum *= Math.pow(10,decimalNum);
	tmpNum = Math.round(Math.abs(tmpNum))
	tmpNum /= Math.pow(10,decimalNum);
	tmpNum *= iSign;					// Readjust for sign
	
	
	// Create a string object to do our formatting on
	var tmpNumStr = new String(tmpNum);

	// See if we need to strip out the leading zero or not.
	if (!bolLeadingZero && num < 1 && num > -1 && num != 0)
		if (num > 0)
			tmpNumStr = tmpNumStr.substring(1,tmpNumStr.length);
		else
			tmpNumStr = "-" + tmpNumStr.substring(2,tmpNumStr.length);
		
	// See if we need to put in the commas
	if (bolCommas && (num >= 1000 || num <= -1000)) {
		var iStart = tmpNumStr.indexOf(".");
		
		
		if (iStart < 0)
			iStart = tmpNumStr.length;

		iStart -= 3;
		while (iStart >= 1) {
			tmpNumStr = tmpNumStr.substring(0,iStart) + "," + tmpNumStr.substring(iStart,tmpNumStr.length)
			iStart -= 3;
		}		
	}

	// See if we need to use parenthesis
	if (bolParens && num < 0) {
		tmpNumStr = "(" + tmpNumStr.substring(1,tmpNumStr.length) + ")";
    }
	//alert(tmpNumStr.indexOf("."));
	
	return tmpNumStr;		// Return our formatted string!
}

// *****************************
function floor(number)
{
  return Math.floor(number*Math.pow(10,2))/Math.pow(10,2);
}
// *****************************
function docalc(la , ir, yr) {
  
  var mi = ir/ 100  * (1+BSMV);
  var base = 1;
  var mbase = 1 + mi;
  
  for (i=0; i < yr; i++) {
    base = base * mbase;
  }
  var payperperiod = la * mi / ( 1 - (1/base)) ;
  return payperperiod;
}

// *****************************
function sumincome ()
{
  var mysum = parseFloat(kp_calc_form.maasgelir.value) + parseFloat(kp_calc_form.kiragelir.value) + parseFloat(kp_calc_form.digergelir.value);
  kp_calc_form.toplamgelir.value = mysum;
}
// *****************************
function sumexpense ()
{
  var mysum = parseFloat(kp_calc_form.kartgider.value) + parseFloat(kp_calc_form.tasitgider.value) + parseFloat(kp_calc_form.digergider.value);
  kp_calc_form.toplamgider.value = mysum;
}

// *****************************
function displayshort2 (obj)
{
  var payperperiod = docalc(kp_calc_form.creditamount.value, kp_calc_form.IR.value, kp_calc_form.duration.value);
  var payinterest = payperperiod * kp_calc_form.duration.value - kp_calc_form.creditamount.value;
  kp_calc_form.MT.value = formatnumber(payperperiod,0,false,false,true);
//  kp_calc_form.MP.value = formatnumber(payinterest,0,false,false,true);
}
// *****************************
//