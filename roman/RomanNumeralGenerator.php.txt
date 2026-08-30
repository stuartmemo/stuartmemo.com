<?php
/*
 * Roman Numeral Generator
 * Stuart Brown 2013
 */

interface RomanNumeralGenerator {
    public function generate($integer); // convert from int -> roman
    public function parse($roman); // convert from roman -> int
    public function convert($input); // take either type of input and convert to required type
}

class RomanGenerator implements RomanNumeralGenerator
{
    // Array of Roman numeral values.
    private $romans = array(
        'M' => 1000,
        'CM'=> 900,
        'D' => 500,
        'CD'=> 400,
        'C' => 100,
        'XC'=> 90,
        'L' => 50,
        'XL'=> 40,
        'X' => 10,
        'IX'=> 9,
        'V' => 5,
        'IV'=> 4,
        'I' => 1
    );

    /*
     * Generates Roman numerals from a given integer.
     */
    public function generate($integer) {
        $roman_str = '';

        // Check if integer is inside valid range.
        if (($integer <= 0) ||($integer > 3999)) {
            return 'Sorry, please try again with a valid integer.';
        }

        foreach ($this->romans as $key => $roman) {
            // Subtract largest value we can from original integer.
            while ($integer - $roman >= 0) {
                $integer = $integer - $roman;

                // Build Roman numeral string.
                $roman_str = $roman_str.$key;
            }
        }

        return $roman_str;
    }


    /*
     * Converts Roman numerals into an integer.
     */
    public function parse($roman) {
        $total = 0;
        $roman = strtoupper($roman);

        foreach ($this->romans as $key => $number) {
            // While we're at the first character of the string to convert.
            while (strpos($roman, $key) === 0) {
                $total = $total + $number;
                // Remove characters already converted.
                $roman = substr($roman, strlen($key));
            }

        }

        // Check if total is in the valid range.
        if (($total === 0) || ($total > 3999)) {
            $total = 'Sorry, please try again with valid Roman numerals.';
        }

        return $total;
    }

    /*
     * Checks what type of number is to be converted,
     * and calls the most appropriate method.
     */
    public function convert($input) {
        if (is_numeric($input)) {
            return $this->generate($input);
        } else {
            return $this->parse($input);
        }
    }
}
