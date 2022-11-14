DIR=.
PLANS="$DIR/scripts/themes.json"

echo "[\"\"" > $PLANS;
for i in $DIR/themes/*css; do
    file=$(basename $i);
    title=$(grep "title" $i)

    echo ",\"${file}\"" >> $PLANS
done;
echo "]" >> $PLANS;