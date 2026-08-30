<?php
/*
 * Unit tests for Roman Numeral Generator
 * Stuart Brown 2013
 */

require_once 'RomanNumeralGenerator.php';

class RomanTest extends PHPUnit_Framework_TestCase
{
    protected function setUp()
    {
        $this->generator = new RomanGenerator;
    }

    public function testGenerate()
    {
    	$this->assertEquals($this->generator->generate(1), 'I');
    	$this->assertEquals($this->generator->generate(2100), 'MMC');
    	$this->assertEquals($this->generator->generate(3999), 'MMMCMXCIX');


    	$this->assertEquals($this->generator->generate(-1), 'Sorry, please try again with a valid integer.');
    	$this->assertEquals($this->generator->generate(4000), 'Sorry, please try again with a valid integer.');
    	$this->assertEquals($this->generator->generate(''), 'Sorry, please try again with a valid integer.');
    	$this->assertEquals($this->generator->generate('abcd'), 'Sorry, please try again with a valid integer.');
    }

    public function testParse()
    {
    	$this->assertEquals($this->generator->parse('I'), 1);
    	$this->assertEquals($this->generator->parse('cv'), 105);
    	$this->assertEquals($this->generator->parse('MMMCMXCIX'), 3999);

    	$this->assertEquals($this->generator->parse(-1), 'Sorry, please try again with valid Roman numerals.');
    	$this->assertEquals($this->generator->parse(4000), 'Sorry, please try again with valid Roman numerals.');
    }

    public function testConvert()
    {
    	$this->assertEquals($this->generator->convert('I'), 1);
    	$this->assertEquals($this->generator->convert('mmxiii'), 2013);

    	$this->assertEquals($this->generator->convert(0), 'Sorry, please try again with a valid integer.');
    	$this->assertEquals($this->generator->convert('abcd'), 'Sorry, please try again with valid Roman numerals.');
    }
}
