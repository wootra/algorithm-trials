QUESTION=$1
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