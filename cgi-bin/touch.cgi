#!/usr/bin/perl

print "Content-type: text/html\n\n" ;
print "";

print "<html>";
print "<head></head>";
print "<body>";


use strict;
use warnings;

my $buffer = "";
if ($ENV{'REQUEST_METHOD'} eq "POST"){
  read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
}
else{
 $buffer = $ENV{'QUERY_STRING'};
}

print "BUFFER: " . $buffer;

my $var_filename="";

# parse the data received

foreach (split(/&/, $buffer)) {
  my($key, $value) = split(/=/, $_);
  #$key = decodeURL($key);
  #$value = hextoascii(decodeURL($value));

  #$value =~ s!\n\n\n!\n\n!g; # Convert 3 newlines into 2.
  if($key eq "filename"){$var_filename=$value;}
}

print "\n\nCGI";
print "\n\nfilename "  . $var_filename;


open my $touch_file, '>../data/' . $var_filename or die "failed to open $!";


close($touch_file);


print "</body>";
print "</html>";

