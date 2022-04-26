QUESTION=$1
CASE=case$2
verbose=$3

if [ -z $QUESTION ]; then
  echo "this runs only one test based on the case no";
  echo "usage: validateSingle.sh {folderName} {caseNo}";
  echo "";
  echo "folderName should not have / at the end";
  echo "ex> ./validate.sh ./BearAndSteadyGene 1";
  exit;
fi

echo "testing " $QUESTION
cd $QUESTION

OUTPUT_PATH=./outputs/$CASE node main.js < ./cases/$CASE
if cmp -s "./outputs/$CASE" "./answers/$CASE"; then
    echo "==> (O) $CASE passed!"
else
    echo "==> (X) $CASE failed!"
fi

if [ -z $verbose ]; then
echo "==============";
echo "$CASE output:";
cat ./outputs/$CASE;
echo "==============";
echo "$CASE answer:";
cat ./answers/$CASE;
    echo "==============";
fi
echo "---------------------------"
