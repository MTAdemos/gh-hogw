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

my $var_name="";
my $var_email="";
my $var_comment="";

# parse the data received

foreach (split(/&/, $buffer)) {
  my($key, $value) = split(/=/, $_);
  #$key = decodeURL($key);
  #$value = hextoascii(decodeURL($value));

  #$value =~ s!\n\n\n!\n\n!g; # Convert 3 newlines into 2.
  if($key eq "name"){$var_name=$value;}
  if($key eq "email"){$var_email=$value;}
  if($key eq "comment"){$var_comment=$value;}
}

print "\n\nCGI";
print "\n\nname "  . $var_name;
print "\n\nemail "  . $var_email;
print "\n\ncomment "  . $var_comment;


open my $feedback_file, '>>../data/tmp/new_feedback.htm' or die "failed to open $!";

print $feedback_file "<div class='feedbackentry editable newfeedback'>\n";
print $feedback_file "  <div class=name>" . $var_name . "</div>\n";
print $feedback_file "  <div class=email>" . $var_email ."</div>\n";
print $feedback_file "  <div class=comment>" . $var_comment . "</div>\n";
print $feedback_file "</div>\n\n";

close($feedback_file);


print "</body>";
print "</html>";

