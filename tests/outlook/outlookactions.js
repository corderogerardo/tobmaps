/**
 * @memberof Bots
 * @name Outlook
 * @locus	tests/outlook
 * @summary Import CasperJS module and create an instance with configurations.
 * Here you will find the function or Actions that will perform the bot for outlook emails.
 *
 * 1. Set up casperjs and create the configuration for the instance.
 * 2. Imports Libraries for mouse, SelectXPath, utils, cli.
 * 3. From TobMaps MeteorJS APP we pass arguments(args), to this bot, casper.cli.args;
 * 4. Create the outlookurl variable.  The outlook URL where login.
 * 5. Emails and Passwords: Take the casper.cli.args accounts that we passed from MeteorAPP, casper.cli.get("accounts"), and clean the data received.
 * 6. BlackList: The blackList array is where we save the user domains the user specified in schedule as the selected blacklist, passed in the args when we use the meteor method, casper.cli.get("blacklist").
 * 7. WhiteList: The whiteList array is where we save the user domains the user specified in schedule as the selected whitelist, passed in the args when we use the meteor method, casper.cli.get("whitelist").
 * 8. Actions: The actions array variable is where we save the actions that the user has specified in schedule as the selected actions, passed in the args when we use the meteor method, casper.cli.get("actions").
 * 9. We take the args we passed from meteorjs app.
 *
 * @param {casper} STEPS
 * Each casperjs instance follow a series of steps, but they always will LOGIN and LOGOUT, as their first and last step. We will add more functions before login, after logout, to make it look more human possible.
 * @param {IMPORTANT} FUNCTIONS
 * We try to work with NodeJS Modules, to keep the Separations of Concerns SOLID Principle. But we faced for some problems trying to make the bots work like that. So we decided to keep this SOLID principle using FUNCTIONS, so if there is a change in a step of casperjs the developer/programmer only needs to find that function and modified it.
 *
 * @param {casper} start
 * Step one: We start the casper instance and pass the data we received from Meteor TobMaps App.
 * Take the objAccounts array of objects and iterate if there are more than one email account and password.
 * In this case the instance only should receive one email and password.
 *
 * @param {casper} thenOpen
 * Step two: the thenOpen function receive an url as parameter, the outlook website to be requested and where the bot is going to login with the email and password. Once the website loads successfully, we send the account email data and password and click on login/submit to login.
 *
 * @param {casper} then
 * Step three: then we receive all the actions defined by the user and iterate all those actions in the order they came.
 * IMPORTANT: Each action is a function defined in this file.
 * @param {function} moveSpamMessagesOutlook
 * This function receive as param a the blackList that the user selected for the schedule.
 * This function needs another function that perform click on Outlook INBOX before of been executed.
 * The function needs to be located in the INBOX folder of outlook to take the data and work correctly.
 * CasperJS Step to iterate over the ids messages, search the email's sender in the message and extract the domain, if the domain match with a given blacklisted domain move the message to the Junk or Spam folder.
 *
 * @param {function} moveInboxMessagesOutlook
 * This function receive as param a the whiteList- that the user selected for the schedule.
 * This function needs another function that perform click on Outlook SPAM Folder before of been executed.
 * The function needs to be located in the SPAM folder of outlook to take the data and work correctly.
 * CasperJS Step to iterate over the ids emails search the email and extract the domain, if the domain match with a given blacklisted domain move the email to the Junk or Spam folder.
 *
 * @param {function} sendManyMessagesOutlook
 *This function work as follows:
 * 1.perform click on New for send a new Message, that opens the form to send a message.
 * 2.Wait for elements in the form to load correctly to send the email in the TO input. then fill the subject, the main message.
 * 3. then wait for the label "Send", and click on the button called send to send the message.
 *
 *
 * @param {function} dontClickUnsubscribeOutlook
 * This function receive as params the white and black Lists that the user selected for the schedule.
 * This function iterate over all the messages in the INBOX folder. Make click over each message, then perform a click over the title or name of the sender message to look for the email. Once it has gotten the email take the email domain. With the domain search if the domain is in the white or black list with a javascript native function indexOf, this returns -1 if is not, >0 if it is.
 * Then with those values follow a some steps, for example if the domain is in the white list the bot search for all the links <a> tags in the message, if the <a> tag has the text unsubscribe and the domain is in the white list this is ignored, if not then it is clicked by the bot. The case where the domain is not on the white or black list, the decision of making click is taken randomly.
 *
 *
 * @param {functions} MoreFunctions
 *
 * @param {function} takeIdsInboxOutlook
 * This function search and extract all the messages ID's on the Inbox Folder. The messages ids are different to the spam folder.
 * I separate this function because is used in other function and it was more maintainable to separate it. So if there are some changes in the Outlook Website in this specific function, the developer/programmer only needs to change this function.
 *
 * @param {function} takeIdsSpamOutlook
 * This function search and extract all the messages ID's on the Spam Folder. The messages ids are different to the Inbox folder.
 * I separate this function because is used in other function and it was more maintainable to separate it. So if there are some changes in the Outlook Website in this specific function, the developer/programmer only needs to change this function.
 *
 * @param {functions} forClickDifferentOptions
 * 1. clickInboxOutlook for click on the inbox outlook menu option.
 * 1. clickDraftsOutlook for click on the Draft outlook menu option.
 * 1. clickSentItemsOutlook for click on the SentItems outlook menu option.
 * 1. clickDeletedItemsOutlook for click on the DeletedItems outlook menu option.
 * 1. clickArchiveOutlook for click on the Archived outlook menu option.
 * 1. clickJunkOutlook for click on the Junk outlook menu option.
 * 1. logoutOutlook for logout from outlook.
 *
 *
 */
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
		userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11",
		proxy:'http://180.177.157.62:80',
	},
	localToRemoteUrlAccessEnabled: true,
	loadPlugins: true,
	XSSAuditingEnabled: true,
 });

 casper.on('page.error', function(msg, trace) {
	this.echo('Error: ' + msg, 'ERROR');
	for(var i=0; i<trace.length; i++) {
		var step = trace[i];
		this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
	}
});
var mouse = require('mouse').create(casper);
var x = require('casper').selectXPath;
var utils = require("utils");
var meteorarguments = casper.cli.args;
var outlookurl = "https://login.live.com/login.srf?wa=wsignin1.0&ct=1469453425&rver=6.6.6556.0&wp=MBI_SSL&wreply=https:%2F%2Foutlook.live.com%2Fowa%2F&id=292841&CBCXT=out";

/* ,{"email":"ogeretle@outlook.com","password":"goMAD.123"},{"email":"mastercasper@outlook.com","password":"casper.123"},{"email":"tobmaps@yahoo.com","password":"12345678tm"},{"email":"tobmaps@yahoo.com","password":"12345678tm"},{"email":"tobmaps@yahoo.com","password":"12345678tm"},{"email":"tobmaps@yahoo.com","password":"12345678tm"}*/
 /*var accounts = '[{"email":"tobmapx@outlook.com","password":"tobMAPS-123"}]';*/
 var accounts = casper.cli.get("accounts");
 accounts = accounts.replace(/\[/g,"");
 accounts = accounts.replace(/]/g,"");
 accounts = accounts.replace(/{/g,"");
 accounts = accounts.replace(/}/g,"");
 accounts = accounts.replace(/email:/g,"");
 accounts = accounts.replace(/password:/g,"");

//for running in console
 /*accounts = accounts.replace(/"/g,"");
 accounts = accounts.replace(/:/g,"");

 accounts = accounts.replace(/email/g,"");
 accounts = accounts.replace(/password/g,"");*/
//end running in console

 accounts = accounts.split(",");
 var objAccounts=[];
 for(var i = 0;i<accounts.length;i=i+2){
	objAccounts.push({
		email:accounts[i],
		password:accounts[i+1]
	});
 }
 /*var accounts = [{user: 'tobmapx@outlook.com',pwd: 'tobMAPS-123'}];*/

 /*var blackList = '[{"domains":["yahoo.com","outlook.com"]}]';*/
 var blackList = casper.cli.get("blacklist");
 blackList = blackList.replace("[","");
 blackList = blackList.replace("]","");
 blackList = blackList.replace(/\[/g,"");
 blackList = blackList.replace(/\]/g,"");
 blackList = blackList.replace(/{/g,"");
 blackList = blackList.replace(/}/g,"");
 blackList = blackList.replace(/domains:/g,"");

//for running on console
 /*blackList = blackList.replace(/"/g,"");
 blackList = blackList.replace(/:/g,"");

 blackList = blackList.replace(/domains/g,"");*/
//for running on console


 blackList = blackList.split(",");

 /*var whiteList ='[{"domains":["gmail.com","hotmail.com","corderogerardo.com.ve"]}]';*/
 var whiteList = casper.cli.get("whitelist");
 whiteList = whiteList.replace("[","");
 whiteList = whiteList.replace("]","");
 whiteList = whiteList.replace(/\[/g,"");
 whiteList = whiteList.replace(/\]/g,"");
 whiteList = whiteList.replace(/{/g,"");
 whiteList = whiteList.replace(/}/g,"");
 whiteList = whiteList.replace(/domains:/g,"");

//for running on console
 whiteList = whiteList.replace(/"/g,"");
 /*whiteList = whiteList.replace(/:/g,"");

 whiteList = whiteList.replace(/domains/g,"");*/
//for running on console

 whiteList = whiteList.split(",");

 /*var actions ='[{"actions":["multipleAccountsSendEmailAction","unsubscribeAction","moveSpamAction","moveInboxAction"]}]';*/
 var actions = casper.cli.get("actions");
 actions = actions.replace("[","");
 actions = actions.replace("]","");
 actions = actions.replace(/\[/g,"");
 actions = actions.replace(/\]/g,"");
 actions = actions.replace(/{/g,"");
 actions = actions.replace(/}/g,"");
 actions = actions.replace(/actions:/g,"");

//for running on console
/* actions = actions.replace(/"/g,"");
 actions = actions.replace(/:/g,"");

 actions = actions.replace(/actions/g,"");*/
//for running on console

 actions = actions.split(",");

 console.log("Data: "+accounts);
 console.log("Data: "+whiteList);
 console.log("Data: "+blackList);
 console.log("Data: "+actions);

 var meteorarguments = casper.cli.args;

 casper.start(function(self, index,objAccounts, whiteList, blackList, actions,outlookurl,yahoourl){
 });
 objAccounts.forEach(function(account,index){
	var results;
	var ids;
	 /* var username = "tobmapx@outlook.com";*/
	 var username = account.email;
	 /* var password = "tobMAPS-123";*/
	 var password = account.password;

casper.then(function(){
	this.wait(2000);
});

casper.thenOpen(outlookurl,function(){
			this.echo("You're in CASPER.THENOPEN");

		 this.fill('form[name="f1"]',
		 {
			//tobmaps@yahoo.com
			//spamBOT-12345678
			loginfmt: username,
			passwd: password
		},true);
		 this.wait(10000);
});

// HERE IS GOING TO BE CALLED THE FUNCTIONS MODULES IMPORTED
// Iterate over all the actions to activate them
casper.then(function(){
	actions.forEach(function(action,index){
		if(action=="moveSpamAction"){
			console.log("Here enter to MOVESPAM outlook");
			clickInboxOutlook();
			takeIdsInboxOutlook();
			moveSpamMessagesOutlook(blackList);
		}
		if(action=="moveInboxAction"){
			console.log("Here enter to MOVEINBOX, out of Junk/spam");
			clickJunkOutlook();
			takeIdsSpamOutlook();
			moveInboxMessagesOutlook(whiteList);
		}
		if(action=="multipleAccountsSendEmailAction"){
			console.log("Here enter to SendManyMAils");
			clickInboxOutlook();
			sendManyMessagesOutlook();
		}
		if(action== "unsubscribeAction"){
			console.log("Here enter to unsubscribe");
			clickInboxOutlook();
			takeIdsInboxOutlook();
			dontClickUnsubscribeOutlook(whiteList,blackList);
		}
	});/*end forEach*/
});

 clickJunkOutlook();
 clickDraftsOutlook();
 clickDeletedItemsOutlook();
 clickArchiveOutlook();
 clickInboxOutlook();
 logoutOutlook();

});/*END objAccounts.forEach*/

function takeIdsInboxOutlook(){
	results=[];
	casper.then(function(){
		results = casper.evaluate(function(){
			ids = [];

		 $.each($("div[aria-label='conversation'] > div > div > div > div > div"),function(x,y){
			/* $.each($("div[autoid='_lvv_9'] > div"),function(x,y){*/
				ids.push($(y).attr("id"));
			});
		 return ids;
		});
	});
	casper.then(function(){
		this.echo("Mails ID: "+JSON.stringify(results));
	});
}

function takeIdsSpamOutlook(){
	results=[];
	casper.then(function(){
		results = this.evaluate(function(){
			ids = [];
			$.each($("div[aria-label='item'] > div > div > div > div > div"),function(x,y){
				ids.push($(y).attr("id"));
			});
			return ids;
		});
		utils.dump(results);
		this.wait(2000);
	});
	casper.then(function(){
		this.echo("Mails ID: "+JSON.stringify(results));
	});
}/*End function takeIdsInboxOutlook*/
function clickInboxOutlook(){
	casper.then(function(){
		this.waitForText("Inbox", function(){
			this.clickLabel("Inbox");
		});
		this.wait(3000);
		/*this.capture("ClickToJunt");*/
	});
}
function clickDraftsOutlook(){
	casper.then(function(){
		this.waitForText("Drafts", function(){
			this.clickLabel("Drafts");
		});
		this.wait(3000);
		/*this.capture("ClickToJunt");*/
	});
}
function clickSentItemsOutlook(){
	casper.then(function(){
		this.waitForText("Sent Items", function(){
			this.clickLabel("Sent Items");
		});
		this.wait(3000);
		/*this.capture("ClickToJunt");*/
	});
}
function clickDeletedItemsOutlook(){
	casper.then(function(){
		this.waitForText("Deleted Items", function(){
			this.clickLabel("Deleted Items");
		});
		this.wait(3000);
		/*this.capture("ClickToJunt");*/
	});
}
function clickArchiveOutlook(){
	casper.then(function(){
		this.waitForText("Archive", function(){
			this.clickLabel("Archive");
		});
		this.wait(3000);
		/*this.capture("ClickToJunt");*/
	});
}
function clickJunkOutlook(){
	casper.then(function(){
		this.waitForText("Junk Email", function(){
			this.clickLabel("Junk Email");
		});
		this.wait(3000);
		/*this.capture("ClickToJunt");*/
	});
}
function logoutOutlook(){
	/*https://outlook.live.com/owa/logoff.owa*/
	/*https://login.live.com/logout.srf?ct=1475252818&rver=6.4.6456.0&lc=8202&id=64855&ru=https:%2F%2Fblu183.mail.live.com%2Fhandlers%2FSignout.mvc%3Fservice%3DLive.Mail%26mkt%3Des-ve&mkt=es-ve*/
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
	casper.thenOpen("https://outlook.live.com/owa/logoff.owa",function(){
		this.echo("logout yes");
	});
	casper.then(function(){
		this.wait(10000);
	});
}

function moveSpamMessagesOutlook(blackList){
 casper.then(function(){
	email="";
	domain="";
	emails = [];
	casper.each(results, function iterateids(self,id,index){
		self.then(function thenIterate(){
			casper.echo("Count "+(results.length-1));
			casper.echo('index '+index);
			casper.echo('#'+id+' > div');
			casper.click('#'+id+' > div');
			casper.mouse.click('#'+id+' > div');
			/*this.mouse.click('div[id="'+id+'"] > div > span[autoid="_lvv_j"]');*/
		});
		self.wait(5000);
		self.then(function(){
			this.mouse.click('span[class="bidi allowTextSelection"]');
			this.wait(5000);
			/*email = this.fetchText("a[class='_rpc_i1 o365button'] > span ");*/
		email = this.fetchText("a[class='_rpc_i1 o365button'] > span ");
		this.echo("Email "+email);
		email = email.slice(18,email.length);
			emails.push(email);
			domain = email.replace(/.*@/, "");
			this.echo("Email: "+email+" Domain: "+domain+" Emails: "+emails+ " BlackList: "+blackList);

		/*
			Casper.waitForSelector wait to the email document appear so I can click over the message and extract the email and find the domain.
		 */
		 this.waitForSelector("div[role='document']",function(){
			/*this.waitForSelector("div[role='document']",function(){*/
				this.mouse.click('span[class="bidi allowTextSelection"]');

				this.wait(5000);
				/*blacklist = blacklist.split(",");*/
				this.echo("BlackList of casper args: "+ blackList);
		/*
			If the domain is in the blacklist I click to Junk to move to junk folder.
			blacklist.indexOf(domain)! indexOf Method to know if in the blacklist or not.
		 */
		 if(blackList.indexOf(domain)!=-1){
			this.clickLabel("Junk");
		 }
		});
		});

	});
 });
 casper.then(function(){
	this.wait(10000);
 });
}/*End function moveSpamMessagesOutlook*/
function moveInboxMessagesOutlook(whiteList){
	email="";
	domain="";
	emails = [];
	casper.then(function(){
		this.each(results, function iterateids(self,id){
			casper.then(function thenIterate(){
				this.echo('div[id="'+id+'"] > div');
				this.click('div[id="'+id+'"] > div');
				/*this.mouse.click('div[id="'+id+'"] > div > span[autoid="_lvv_j"]');*/
				casper.wait(5000);
			});
			casper.then(function(){
				this.mouse.click('span[class="bidi allowTextSelection"]');
				this.wait(5000);
					this.waitForSelector("div[role='document']",function(){
					this.mouse.click('span[class="bidi allowTextSelection"]');
					this.wait(5000);
				email = this.fetchText("a[class='_rpc_i1 o365button'] > span ");
		this.echo("Email "+email);
		email = email.slice(18,email.length);
		domain = email.replace(/.*@/, "");
					emails.push(email);
					domain = email.replace(/.*@/, "");
					this.wait(2000);
					this.echo("Email: "+email+" Domain: "+domain+" Emails: "+emails+ " WhiteList: "+whiteList);
					this.wait(5000);
					this.echo("WhiteList of casper args: "+ whiteList);
					if(whiteList.indexOf(domain)!=-1){
						this.clickLabel("Not junk");
						countOutJunk++;
					}
				});
			});
		});
	});

	casper.then(function(){
		this.wait(10000);
	});
}/*End function moveInboxMessagesOutlook*/
function sendManyMessagesOutlook(){
	casper.repeat(3,function(){
		casper.then(function(){
			this.waitForText("New", function(){
				this.clickLabel("New");
			});
			this.wait(2000);
		});

		casper.then(function(){
			this.waitForText("To", function(){
				var toaccount = Math.floor(Math.random() * objAccounts.length) + 1;
				this.sendKeys("input[aria-label='To recipients. Enter an email address or a name from your contact list.']",""+ objAccounts[toaccount-1].email+" ", {keepFocus: true});
				this.sendKeys("input[aria-label='To recipients. Enter an email address or a name from your contact list.']", casper.page.event.key.Enter , {keepFocus: true});
				this.page.sendEvent("keypress", casper.page.event.key.Enter);
				this.echo("send press enter to page");
				this.wait(1000);
			});
		});


		casper.then(function(){
			this.waitForText("To",function(){
				this.sendKeys("input[placeholder='Add a subject']", "this is killerbox");
				this.wait(1000);
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
				this.wait(1000);
			});
		});

		casper.then(function(){
			this.waitForText("Send", function(){
				this.clickLabel("Send");
			});
			this.wait(2000);
		});
	});/*Casper.repeat*/
}/*End function sendManyMessagesOutlook*/
function dontClickUnsubscribeOutlook(whiteList,blackList){
casper.then(function(){
	email="";
	domain="";
	emails = [];
this.each(results, function(self,id){
	self.then(function(){
		this.echo('div[id="'+id+'"]');
		this.click('div[id="'+id+'"] > div');
		});
		this.wait(2000);
		this.mouse.click('span[class="bidi allowTextSelection"]');
		email = this.fetchText("a[class='_rpc_i1 o365button'] > span ");
		this.echo("Email "+email);
		email = email.slice(18,email.length);
		domain = email.replace(/.*@/, "");
		this.then(function(){
			this.wait(2000);
			this.mouse.click('span[class="bidi allowTextSelection"]');
			email = this.fetchText("a[class='_rpc_i1 o365button'] > span ");
			email = email.slice(18,email.length);
			domain = email.replace(/.*@/, "");

			this.waitForSelector("div[role='document']",function(){
				this.mouse.click('span[class="bidi allowTextSelection"]');
				this.wait(5000);
				email = this.fetchText("a[class='_rpc_i1 o365button'] > span ");
				email = email.slice(18,email.length);
				emails.push(email);
				domain = email.replace(/.*@/, "");
				this.wait(5000);
				this.echo("Email: "+email+" Domain: "+domain+" Emails: "+emails+ " WhiteList: "+whiteList+ " BlackList: "+blackList);
				this.wait(5000);

				var isOnWhiteList = whiteList.indexOf(domain);
				var isOnBlackList = blackList.indexOf(domain);

				this.evaluate(function(isOnWhiteList, isOnBlackList){
					alert("Evaluate - White: "+isOnWhiteList+" Black: "+isOnBlackList);
					$.each($("div[role='document'] a"), function(self,link){
						self = this;
						alert("WhiteList: "+isOnWhiteList+" blacklist: "+isOnBlackList);
						if(  $.trim( $(self).text() ) === 'unsubscribe') {
							if(isOnWhiteList != -1){
								alert("Is in white list I dont click unsubscribe");
							}else{
								alert("Not in white list");
								alert(isOnBlackList);
								if(isOnBlackList!= -1){
									alert("In black list I click unsubscribe");
									this.click(self);
								}else{
									alert("Not in white and black list I click it then");
									var decide = Math.floor(Math.random() * 2) + 1;
									if(decide === 1){
										alert("Value to decide action: "+decide);
										this.click(self);
									}else{
										alert("Value to decide action: "+decide);
									}
								}
							}
						}else{
							alert($.trim( $(self).text() ));
							this.click($(self));
						}
					});
				},isOnWhiteList, isOnBlackList);
				this.wait(5000);

			});
			this.wait(2000);
		});
	});
});
casper.then(function(){
this.wait(5000);
});
}

casper.run(function(){
	this.exit();
});