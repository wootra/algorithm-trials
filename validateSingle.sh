QUESTION=$1
CASE=case$2
echo "testing " $QUESTION
cd $QUESTION

OUTPUT_PATH=./outputs/$CASE node main.js < ./cases/$CASE
if cmp -s "./outputs/$CASE" "./answers/$CASE"; then
    echo "==> (O) $CASE passed!"
else
    echo "==> (X) $CASE failed!"
fi

echo "==============";
echo "$CASE output:";
cat ./outputs/$CASE;
echo "==============";
echo "$CASE answer:";
cat ./answers/$CASE;
    echo "==============";

echo "---------------------------"
