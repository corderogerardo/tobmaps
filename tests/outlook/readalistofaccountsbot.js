var casper = require("casper").create({
	clientScripts: ['../../../../../tests/jquery.min.js'],
	verbose: true,
    logLevel: "debug",
	viewportSize:
		{
			width: 1300,
			height: 700
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

var utils = require("utils");


var lists = ["tobmapx@outlook.com","tobMAPS-123","ogeretle@outlook.com","goMAD.123","mastercasper@outlook.com","casper.123","tobmapx@outlook.com","tobMAPS-123","ogeretle@outlook.com","goMAD.123","mastercasper@outlook.com","casper.123","tobmapx@outlook.com","tobMAPS-123","ogeretle@outlook.com","goMAD.123","mastercasper@outlook.com","casper.123","tobmapx@outlook.com","tobMAPS-123","ogeretle@outlook.com","goMAD.123","mastercasper@outlook.com","casper.123"];

casper.start("https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out", function(){
	/*this.capture("outlookCasperStart.png");*/
});

casper.then(function(){
	var counter = 0;
	casper.repeat(lists.length/2,function(){
		this.echo("Print twice! "+ counter);

		casper.thenOpen('https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out', function(){
				this.echo("You're in CASPER.THENOPEN");
				if(counter===1){
					this.fill('form[name="f1"]',
					{
						loginfmt: lists[counter-1],
						passwd: lists[counter]
					},true);
					this.wait(10000);
				}else{
					this.fill('form[name="f1"]',
					{
						loginfmt: lists[counter],
						passwd: lists[counter+1]
					},true);
					this.wait(10000);
					counter++;
				}
				/*this.capture('outlookCasperThenOpen.png');*/
		});

		casper.then(function(){
			this.waitForText("New", function(){
				this.clickLabel("New");
			});
			this.wait(2000);
		});

		casper.then(function(){
			this.waitForText("To",function(){
				this.sendKeys("input[aria-label='To recipients. Enter an email address or a name from your contact list.']", 'tobmapx@outlook.com ');
				this.wait(5000);
			});
		});

		casper.then(function(){
			this.waitForText("To", function(){
				this.sendKeys("input[aria-label='To recipients. Enter an email address or a name from your contact list.']", 'tobmapx@outlook.com ', {keepFocus: true});
				this.sendKeys("input[aria-label='To recipients. Enter an email address or a name from your contact list.']", casper.page.event.key.Enter , {keepFocus: true});
				this.page.sendEvent("keypress", casper.page.event.key.Enter);
				this.echo("send press enter to page");
				this.wait(5000);
			});
		});


		casper.then(function(){
			this.waitForText("To",function(){
				this.sendKeys("input[placeholder='Add a subject']", "this is killerbox");
				this.wait(5000);
			});
		});

		casper.then(function(){
			this.waitForText("To", function(){
				this.sendKeys("div[aria-label='Message body']","http://example.me \n");
			});
		});

		casper.then(function(){
			this.waitForText("To", function(){
				this.sendKeys("div[aria-label='Message body']", 'http://paisajeweb.com.ve ', {keepFocus: true});
				this.sendKeys("div[aria-label='Message body']", casper.page.event.key.Enter , {keepFocus: true});
				this.page.sendEvent("keypress", casper.page.event.key.Enter);
				this.echo("send press enter to page");
				this.wait(5000);
			});
		});

		casper.then(function(){
			this.waitForText("Send", function(){
				this.clickLabel("Send");
			});
			this.wait(5000);
		});
		casper.then(function(){
			this.waitForSelector("button[autoid='__Microsoft_O365_ShellG2_MeTile_Owa_templates_cs_0']", function(){
				this.click("button[autoid='__Microsoft_O365_ShellG2_MeTile_Owa_templates_cs_0']");
			});
		});
		casper.then(function(){
			this.wait(1000);
		});
		casper.then(function(){
				this.waitForText("Sign out",function(){
					this.clickLabel("Sign out");
				});
		});
		counter++;
	});/*end repeat*/
});/*end main then step*/





casper.then(function(){
	this.wait(10000);
});

casper.run(function(){
	this.exit();
});