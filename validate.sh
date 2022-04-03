QUESTION=$1

if [ -z $QUESTION ]; then
  echo "usage: validate.sh {folderName} [verbose]";
  echo "";
  echo "folderName should not have / at the end";
  echo "ex> ./validate.sh ./BearAndSteadyGene verbose";
  echo "verbose is optional to see more information";
  exit;
fi

OPT=$2
echo "testing " $QUESTION
cd $QUESTION
CASES=$(basename -a ./cases/*)
echo "---------------------------"
for CASE in $CASES; do
    OUTPUT_PATH=./outputs/$CASE node main.js < ./cases/$CASE
    if cmp -s "./outputs/$CASE" "./answers/$CASE"; then
        echo "==> (O) $CASE passed!"
    else
        echo "==> (X) $CASE failed!"
    fi
    if [[ $OPT = "verbose" ]]; then
        echo "==============";
        echo "$CASE output:";
        cat ./outputs/$CASE;
        echo "==============";
        echo "$CASE answer:";
        cat ./answers/$CASE;
         echo "==============";
    fi
    echo "---------------------------"
done