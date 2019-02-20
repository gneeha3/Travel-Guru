/**
 * http://usejsdoc.org/
 */
var lineReader = require('line-reader');
var path = require('path');

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

/**
 * Send the contents of an HTML page to the client
 * with an inserted body text.
 * @param text the body text.
 * @param result the HTTP result.
 */
function sendBody(text, result)
{
    var html = '<!DOCTYPE html>\n'
        + '<html lang="en-US">\n'
        + '<head>\n'
        + '    <meta charset="UTF-8">\n'
        + '    <title>Form Examples</title>\n'
        + '</head>\n'
        + '<body>\n'
        + '    ' + text + '\n'  // insert the body text
        + '</body>\n'
        + '</html>\n';
    
    result.send(html);    
}


/*
 * GET home page.
 */
module.exports.home = function(req,res) 
{
	res.sendFile('landing.html', { root: path.join(__dirname, '../../public') });
    //res.sendFile('landing.html');
	//alert("Hello! I am an alert box!!");
};

