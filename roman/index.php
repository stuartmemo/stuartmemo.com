<!doctype html>
<html>
    <head>
        <title>Roman Numeral Converter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="app/bower_components/sass-bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <link href="app/bower_components/sass-bootstrap/dist/css/bootstrap-theme.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="container">
            <h2>Roman Numeral Converter</h2>
            <div class="row">
                <div class="col-md-6">
                    <form role="form" method="post" id="roman-form" action="">
                        <div class="form-group">
                            <label for="converter">Enter either a number (from 0 to 3999) or Roman numerals</label>
                            <input id="converter" class="form-control" name="number-to-convert" type="text" placeholder="Integer or Roman Numerals" autocomplete="off" required/>
                        </div>
                        <button type="submit" class="btn btn-default btn-primary">Convert</button>
                    </form>
                </div>
                <div class="col-md-6">
                    <div id="result"></div> 
                    <?php
                        require_once 'RomanNumeralGenerator.php';

                        $generator = new RomanGenerator;

                        if (isset($_POST['number-to-convert'])) {
                            print filter_var($generator->convert($_POST['number-to-convert']), FILTER_SANITIZE_STRING);
                        }
                    ?>
                </div>
            </div>
            <div class="row">
                <hr/>
                <div class="col-md-10">
                    <h3>Code</h3>
                    <p>
                        The various files I created for this task are available online:
                    </p>
                    <ul>
                        <li><a href="tests.php.txt">tests.php</a>
                        <li><a href="RomanNumeralGenerator.php.txt">RomanNumeralGenerator.php</a>
                        <li><a href="index.php.txt">index.php</a>
                        <li><a href="ajax.php.txt">ajax.php</a>
                    </ul>

                    <h3>About</h3>
                    <p>
                        The above converter uses jQuery, Bootstrap, and PHPUnit for unit tests.
                    </p>
                    <p>
                        Initital unit tests were written by describing tests for a variety of numbers and Roman numerals,
                        both valid and invalid. These tests failed until I had successfully written both <i>generate</i>
                        and <i>parse</i> functions. Later, it became apparent that it would be benefitial to have a more
                        generic <i>convert</i> function. I followed the same process, writing a test script that failed
                        until I successfully coded the function correctly.
                    </p>
                    <p>
                        The form uses AJAX to avoid a page load when submitted.
                    </p>

                    <h3>Questions</h3>
                    <p>
                        <strong>
                            1. We're looking for people with a real passion for web technologies who 
                            collaboratively create great web applications. With reference to the required skills 
                            and experience for this role, please give an example of a web application (or part of) 
                            that you have built from concept to deployment, outlining the steps you took. (1000 
                            character limit)
                        </strong>
                    </p>

                    <p>
                        I was recently tasked with implementing a new social login system across all STV sites. I had various discussions with the team's designers, UX manager, and Head of Digital Content. Subsequently, basic designs were produced and a series of User Stories to work from were created. The social login system was to be based on a 3rd-party API, so I used a "spike" to investigate the capabilities of the system and get a better idea of what would be involved in implementing some of the features. As the project progressed, I used to JavaScript, HTML, and SASS to create a modular, easily manageable system that allowed users to log-in using Google, Twitter, or Facebook. 
                    </p>

                    <p>
                        <strong>
                            2. Using the example that you provided above, tell us about a significant decision you 
                    made to solve a technical challenge. Give details of technologies that you chose and 
                    why you chose them. (1000 character limit)
                        </strong>
                    </p>
                    <p>
                        Due to the large amount of JavaScript that would be involved in this project, I decided to make use of <a href="http://requirejs.org/">require.js</a> - a JavaScript module loader. This meant that the vast amount of code could be broken down into several more manageable chunks. It also meant that any module I wrote could be reused elsewhere in another project, without other developers worrying about the script's dependencies.
                    </p>

                    <p>
                        <strong>
                            3. Using the example that you provided above, tell us about how you ensured your 
                            software was fit for purpose and of high quality. What did you learn and what would 
                            you do differently next time to do a better job? (1000 character limit).
                        </strong>
                    </p>
                    <p>
                        Luckily, my team has access to two excellent testers, meaning that the final delivered product was rock solid due to vigorous testing. Unfortunately, I didn't write against a testing framework, which would have given me much more confidence in my code. I've recently begun using Jasmine, which is a BDD framework for testing JavaScript. This has proven invaluable in developing <a href="http://theresassoundworld.com/">Theresa's Sound World</a>.
                    </p>
                </div>
            </div>
        </div>
        <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
        <script>
            $('#roman-form').on('submit', function (e) {
                e.preventDefault();
                $.post('ajax.php', $('#roman-form').serialize(), function (data) {
                    $('#result').html(
                        '<label>Result</label><br/>' + data
                    );
                });
            });
        </script>
    </body>
</html>
