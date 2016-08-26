var casper = require("casper").create({
	verbose: true,
    logLevel: "debug",
	viewportSize:
		{
			width: 1650,
			height: 931
		},
	 pageSettings:
	 	{
		userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11"
		},
	localToRemoteUrlAccessEnabled: true,
	loadPlugins: true,
	XSSAuditingEnabled: true

});

var mouse = require("mouse").create(casper);
var x = require("casper").selectXPath;

casper.start("https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out", function(){
	/*this.capture("outlookCasperStart.png");*/
});

casper.thenOpen('https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out', function(){
	this.echo("You're in CASPER.THENOPEN");
	this.fill('form[name="f1"]',
		{
			loginfmt: 'tobmapx@outlook.com',
			passwd: 'tobMAPS'
		},true);
	this.wait(10000);
	/*this.capture('outlookCasperThenOpen.png');*/
});

casper.then(function(){
	this.waitForText("Your account or password is incorrect. If you don't remember your password",function(){
		this.echo("Bad login");
		casper.die("Bad Login").exit();
		this.echo("Bad login");
		this.echo("Bad login");
	});
});

casper.then(function(){
	this.echo("Here is another step if casper die this should not be shown");
});

casper.then(function(){
	this.wait(30000);
});

casper.run(function(){
	this.exit();
});