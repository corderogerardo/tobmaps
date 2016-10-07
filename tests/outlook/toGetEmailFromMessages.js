email = casper.getElementAttribute('div[aria-label="Contact information. Use the arrow keys to navigate."] > div > div:nth-child(2)','aria-label');
					});
					email = email.slice(18,email.length);
					val = email.substring(email.length-6,email.length-1);
					email = val;
					emails.push(email);
					domain = email.replace(/.*@/, "");