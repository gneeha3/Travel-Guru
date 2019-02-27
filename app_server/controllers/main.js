/**
 * http://usejsdoc.org/
 */
var lineReader = require('line-reader');
var path = require('path');
var registeredUsers = [];

/**
 * Send the contents of an HTML page to the client.
 * @param fileName the name of the file containing the HTML page.
 * @param result the HTTP result.
 */
function sendPage(fileName, result)
{
    var html = '';

    // Read the file one line at a time.
    lineReader.eachLine(fileName,
        /**
         * Append each line to string html.
         * Send the contents of html to the client
         * after the last line has been read.
         * @param line the line read from the file.
         * @param last set to true after the last line.
         */
        function(line, last)
        {
            html += line + '\n';

            if (last)
            {
                result.send(html);
                return false;
            }
            else
            {
                return true;
            }
        });
}


/*
 * GET home page.
 */

module.exports.home = function(req,res)
{
	res.sendFile('landing.html', { root: path.join(__dirname, '../../public') });

};

//Get registration page
module.exports.register = function(req,res)
{
	res.sendFile('register.html', { root: path.join(__dirname, '../../public') });

};

//Get login page
module.exports.login = function(req,res)
{
	res.sendFile('login.html', { root: path.join(__dirname, '../../public') });

};

//Get about page
module.exports.about = function(req,res)
{
	res.sendFile('about.html', { root: path.join(__dirname, '../../public') });

};

module.exports.postRegister = function(req,res)
{

    var existingUser = registeredUsers.filter(function(user)
    {
    	return user.emailAddress === req.body.emailAddress;
    });


    if (existingUser.length > 0)
    {
    	//res.render('error.jade',{message: 'User already exists!!!'})
		res.send("User Already exists! Please login with your credentials");
    }


    else
    {
    	var user = {    firstName: req.body.firstName,
    					lastName: req.body.lastName,
    					emailAddress: req.body.emailAddress,
    					phoneNumber: req.body.phoneNumber,
    					password: req.body.password
                      };
    	registeredUsers.push(user);
    	console.log(req.body);
    	res.redirect('/');
    }
};

module.exports.postLogin = function(req,res)
{
    var matches = registeredUsers.filter(function(user)
                  {
                      return    (((user.emailAddress === req.body.emailAddress))
                             && (user.password === req.body.password));
                  });


    if (matches.length === 0)
    {
		res.send("Invalid credentials..Please register before login !! ");

    }
    else
    {
    	res.render('loggedin', { name: matches[0].firstName});

    }

};

//location details
const cities = [
	{
		city:'San Francisco',name: 'Fairmont San Francisco', desc: "World-renowned, Fairmont San Francisco " +
		"hotel presents an awe-inspiring picture of historic San Francisco. " +
		"The grandeur of the hotel coupled with its reputation for impeccable service promises a " +
		"truly memorable experience",price:'$299',phone:'+1 844-829-7501'
	},
	{
		city:'San Francisco',name: 'Hyatt Regency', desc: "The 804-room Hyatt Regency San Francisco " +
        "is the City's only luxury waterfront hotel with breathtaking bay and city views. Ideally located for" +
        " business and leisure, the hotel is in the Financial District, and close to all major city " +
        "attractions",price:'$296',phone:'(415) 792-0864'
	},
	{
		city:'San Francisco',name: 'Cow Hollow Inn and Suites', desc: "When considering a visit to San Francisco, " +
				"chose the Cow Hollow Inn. Centrally located between the Golden Gate Bridge and" +
				" Fisherman's Wharf, San Francisco's Cow Hollow district is known for its rich architectural" +
				" flavor and quaint neighborhood charm." ,price:'$406',phone:'(415) 301-3040'
	},
	{
		city:'San Francisco',name: 'Harbor Court Hotel', desc: "The Harbor Court Hotel, a stunning boutique" +
				" hotel on the San Francisco waterfront, features unobstructed views of the bay, " +
				"the Bay Bridge and Treasure Island. The spectacular location is complemented by the hotel's " +
				"luxurious and stylishly designed rooms. " +
		"truly memorable experience",price:'$200',phone:'(415) 882-1300'
	},
	{
		city:'Las Vegas',name: 'Caesars Palace', desc: "Iconic Luxury Strip Resort A tribute to " +
				"the opulence of Rome, the iconic Caesars Palace - Resort & Casino offers" +
				" an empire of restaurants, nightlife, gaming, relaxation, and entertainment in " +
				"the center of the Las Vegas Strip. Celebrity chefs and entertainers The " +
				"4,100-seat Colosseum at Caesars Palace is home to world-class entertainment " ,
				price:'$183',phone:'+1 855-782-3877'
	},
	{
		city:'Las Vegas',name: 'Bellagio Las Vegas', desc: "Inspired by the beautiful villages " +
				"of Europe, AAA Five Diamond Bellagio overlooks a Mediterranean-blue lake in " +
				"which fountains perform a magnificent ballet choreographed to music and lights. " +
				"The lobby is, in a word, grand, both in scale and in design. Above the 18-foot " +
				"ceiling is a coffer filled with the most extraordinary glass masterpiece, Fiori " +
				"di Como, created by glass sculptor Dale Chihuly, whose work has been exhibited" +
				" in every major museum in the world.",price:'$179',phone:'+1 888-987-6667'
	},
	{
		city:'Las Vegas',name: 'Trump International Hotel', desc: "Towering over The Las Vegas " +
				"Strip, the Trump International Hotel™ - Las Vegas is a non-smoking luxury resort " +
				"offering 1,232 graciously furnished hotel suites and 50 magnificent penthouses. " +
				"Boasting the finest views of The Strip, the hotel lies where Las Vegas Blvd meets " +
				"Fashion Show Drive, adjacent to the best shopping and finest casinos in the city.",
				price:'$230',phone:'+1 844-848-4206'
	},
	{
		city:'Las Vegas',name: 'ARIA Resort & Casino', desc: "ARIA Resort & Casino is a AAA" +
				" Five Diamond Award winning resort which offers you the best in accommodations, " +
				"gaming, dining and entertainment. Check out the newest place to see and be seen " +
				"on the Las Vegas Strip.",price:'$229',phone:'+1 866-359-7757'
	},
	{
		city:'Los Angeles',name: 'Shore Hotel', desc: "The essence of legendary 5 star customer " +
				"service and breath taking ocean views Shore Hotel celebrated our soft opening in " +
				"early October of 2011 and are proud to be Santa Monica's first and only upscale " +
				"boutique Gold LEED certified property.Shore Hotel is located on Ocean Avenue in " +
				"Santa Monica, just steps from the Santa Monica Pier, 3rd Street Promenade, and " +
				"the city’s popular beaches and shopping districts. " ,
				price:'$359',phone:'(310) 254-2319'
	},
	{
		city:'Los Angeles',name: 'Loews Hollywood Hotel', desc: "The Hollywood sign. The Hills. " +
				"The Academy Awards. Jimmy Kimmel Live. The Hollywood Walk of Fame. The city's " +
				"major movie studios. This is the stuff a classic visit to Hollywood is made of-and" +
				" a stay at Loews Hollywood Hotel puts you right in the middle of all the action." +
				"Whether it's sightseeing, business or relaxation that brings you here, our 628 " +
				"guestrooms and suites are the perfect place to unwind after a day in L.A.",
				price:'$289',phone:'+1 855-563-5917'
	},
	{
		city:'Los Angeles',name: 'The Hollywood Roosevelt', desc: "From The Tower, built in 1927," +
				" where Gable and Lombard lived, to The Cabanas, vintage 1950s, where Marilyn " +
				"Monroe lived, guests have two distinct accommodations options. The Tower has " +
				"undergone a 25 million dollar renovation designed by Yabu Pushelberg. ",
				price:'$279',phone:'(323) 736-5970'
	},
	{
		city:'Los Angeles',name: 'Viceroy Santa Monica', desc: "Where LA meets the Ocean - British" +
				" impressions- with bold current perspectives. Business friendly- yet vacation" +
				" ready- and just steps from the Santa Monica pier- beaches- shopping- dinning and" +
				" nightlife. Each of the 162 guestrooms and suites offer ocean- pool- or palm" +
				" views. ",price:'$450',phone:'(310) 260-7500'

	}
];

module.exports.search = function(req,res)
{
	var city= req.body.search;

    let matchedCity = cities.filter(val => {
        return ((val.city === city));
    })

    res.render('search', {city:city ,hotels: matchedCity});

};
