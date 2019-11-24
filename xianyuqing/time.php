<?php
echo getMillisecond();


function getMillisecond(){
	list($s1,$s2)=explode(' ',microtime());
	return (float)sprintf('%.0f',(floatval($s1)+floatval($s2))*1000);
}

?>