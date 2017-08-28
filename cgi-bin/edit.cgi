#!/usr/bin/perl

# NB toggle comment son lines 63 * 73 for mac vs skymarket hosting


print "Content-type: text/html\n\n" ;
print "";

print "<html>";
print "<head></head>";
print "<body>";


use strict;
use warnings;

sub decodeURL {
  $_ = shift;
  tr/+/ /;
  s/%(..)/pack('c', hex($1))/eg;
  return($_);
}

sub hextoascii($){
  (my $str=shift)=~s/([a-fA-F0-9]{2})/chr(hex $1)/ge;
  return $str;
}

sub unescape {
  my($str) = splice(@_);
  $str =~ s/%(..)/chr(hex($1))/eg;
  return $str;
}

my $buffer = "";
if ($ENV{'REQUEST_METHOD'} eq "POST"){
  read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
}
else{
 $buffer = $ENV{'QUERY_STRING'};
}

my $var_filename="";
my $var_XML="";

# parse the data received

foreach (split(/&/, $buffer)) {
  my($key, $value) = split(/=/, $_);
  $key = decodeURL($key);
  $value = hextoascii(decodeURL($value));

  $value =~ s!\n\n\n!\n\n!g; # Convert 3 newlines into 2.
  if($key eq "filename"){$var_filename=$value;}
  if($key eq "XML"){$var_XML=$value;}
}



my $XMLlen=length($var_XML);

# code for mac

# my $FileName= "../htdocs" . $var_filename;

# code for KeepNet

my $FileName= "../data/" . $var_filename;




# Now write the file

print "file is " . $FileName;

open (IOFile, ">$FileName") or die "unable to open <$!> for writing";
print IOFile $var_XML;

close(IOFile);

print "</body>";
print "</html>";

