const setMultiMap = (map, value, paths = [], index = 0) => {
    if (index < paths.length - 1) {
        if (!map[paths[index]]) map[paths[index]] = {};
        setMultiMap(map[paths[index]], value, paths, index + 1);
    } else map[paths[index]] = value;
    return map;
};

const getMapValue = (map, paths = [], index = 0) => {
    if (index == paths.length - 1) return map[paths[index]];
    if (map[paths[index]] === undefined) {
        return undefined;
    } else {
        return getMapValue(map[paths[index]], paths, index + 1);
    }
};

const connectTempToEdge = (edges, temps, nodeToConnect, parent) => {
    // console.log(nodeToConnect, temps[nodeToConnect])
    const tempSet = [...temps[nodeToConnect]];
    edges[nodeToConnect] = {
        parent: '' + parent,
        dist: edges[parent].dist + 1,
        children: [],
    };
    delete temps[nodeToConnect];
    for (let child of tempSet) {
        if (!edges[child]) {
            connectTempToEdge(edges, temps, child, nodeToConnect);
        }
    }
};

const fillEdge = (edges, temps, node1, node2) => {
    if (edges[node1] && edges[node2]) {
        console.log(
            'should not happen!',
            node1,
            node2,
            edges[node1],
            edges[node2]
        );
        throw new Error('should not happen');
    }
    if (edges[node1]) {
        edges[node1].children.push(node2);
        if (temps[node2]) {
            connectTempToEdge(edges, temps, node2, node1);
        } else {
            edges[node2] = {
                parent: '' + node1,
                dist: edges[node1].dist + 1,
                children: [],
            };
        }
    } else if (edges[node2]) {
        edges[node2].children.push(node1);
        if (temps[node1]) {
            connectTempToEdge(edges, temps, node1, node2);
        } else {
            edges[node1] = {
                parent: '' + node2,
                dist: edges[node2].dist + 1,
                children: [],
            };
        }
    } else {
        // save the relationship temporarily
        if (!temps[node1]) {
            temps[node1] = new Set();
        }
        if (!temps[node2]) {
            temps[node2] = new Set();
        }
        temps[node1].add(node2);
        temps[node2].add(node1);
    }
};

const modulo = Math.pow(10, 9) + 7;

const mapValue = (map, ...paths) => {
    return getMapValue(map, paths, 0);
};

const findEdgesAndSets = input => {
    const inputs = input.split('\n');
    const edges = {};
    const temps = {}; //temporarily saved.
    const sets = [];
    let mode = 0; //0:edges, 1:sets
    let mode1 = 0;
    // let count = 0;
    let root = null;
    const inputVals = {};
    for (let i = 0; i < inputs.length; i++) {
        const vals = inputs[i]
            .trim()
            .split(' ')
            .filter(v => v.length > 0)
            .map(v => parseInt(v));
        if (mode === 0) {
            if (vals.length == 2) {
                // if (root === null) {
                //     root = '' + vals[0];
                // }
                if (root === null) {
                    root = vals[0];
                    edges[root] = { parent: null, dist: 0, children: [] };
                    fillEdge(edges, temps, vals[0], vals[1]);
                } else {
                    fillEdge(edges, temps, vals[0], vals[1]);
                }
                // const valSorted = vals.sort((a,b)=>a-b);
                // if (!inputVals[vals[0]]) {
                //     inputVals[vals[0]] = new Set();
                // }
                // if (!inputVals[vals[1]]) {
                //     inputVals[vals[1]] = new Set();
                // }
                // inputVals[vals[0]].add(vals[1]);
                // inputVals[vals[1]].add(vals[0]);

                // if(count++>500){
                //      console.log("adding:", vals[0], vals[1])
                // }
            } else if (vals.length === 1) {
                mode = 1;
                mode1 = 0;
            }
        }
        if (mode === 1) {
            if (mode1 === 0) {
                mode1++;
                continue;
            } else {
                mode1 = 0; //alternative
                sets.push(vals);
            }
        }
    }
    // console.log("1", inputVals);
    // const firstKey = Object.keys(inputVals)[0];
    // const [maxConnection,maxCount] = Object.keys(inputVals).map(key=>[key,inputVals[key].size]).reduce((maxItem,val)=>val[1]>maxItem[1]?val:maxItem, ["_",0]);
    // root = maxConnection;
    // edges[root] = { parent: null, dist: 0, children: [] };
    // let relationStack = [...inputVals[root]].map(v => [root, v]);
    // delete inputVals[root];
    // // console.log("root:", root, relationStack);
    // // const consumed = [root];
    // while (relationStack.length > 0) {
    //     // console.log("==>",relationStack);
    //     const [node1, node2] = relationStack.shift();
    //     fillEdge(edges, temps, node1, node2);
    //     // console.log({node1, node2})
    //     if (inputVals[node2]) {
    //         const newValues = [...inputVals[node2]].map(v => [node2, v]);
    //         // console.log({newValues});
    //         relationStack.push(...newValues);
    //         // console.log(relationStack)
    //         delete inputVals[node2];
    //         // consumed.push(node2);
    //         // console.log("3", inputVals, relationStack);
    //     }

    //     // if(relationStack.length===0){
    //     //     if(Object.keys(inputVals).length>0){
    //     //         // console.log("consumed all. retrieve more", consumed.sort((a,b)=>a-b))
    //     //         let newKey = Object.keys(inputVals)[0];
    //     //         relationStack = [...inputVals[newKey]].map(v=>[newKey,v]);
    //     //         delete inputVals[newKey];
    //     //         // console.log("more:", newKey, relationStack);
    //     //         // consumed.push(newKey);
    //     //         // console.log("4", inputVals, relationStack);
    //     //     }

    //     // }
    // }
    // console.log(edges);
    // for(const key of Object.keys(inputVals)){
    //     for(const connected of inputVals[key]){
    //         if(root===null){
    //             root = key;
    //             edges[root] = {parent: null, dist:0, children:[connected]};
    //             edges[connected] = {parent: root, dist:1};
    //         }else{
    //             fillEdge(edges, temps, key, connected);
    //         }
    //     }

    // }
    return { edges, sets };
};
const dist = (edges, u, v) => {
    try {
        const orgUDist = edges[u].dist,
            orgVDist = edges[v].dist;
        // let limit = 1000;
        while (true) {
            // if(limit--<0) throw new Error('overflow!');
            try {
                if (edges[u].dist > edges[v].dist) {
                    if (edges[u].parent) {
                        u = edges[u].parent;
                    } else {
                        console.log('oh-no', 'u', u, edges[u]);
                        throw new Error('should not happen');
                    }
                } else if (edges[u].dist < edges[v].dist) {
                    if (edges[v].parent) {
                        v = edges[v].parent;
                    } else {
                        console.log('oh-no', 'v', v, edges[v]);
                        throw new Error('should not happen');
                    }
                } else {
                    if (`${u}` === `${v}`) {
                        const distHere = edges[u].dist;
                        return orgUDist + orgVDist - distHere * 2;
                    } else {
                        // console.log("same dist but diff",'u',u,'v',v, 'edge[u]', edges[u], 'edge[v]', edges[v], 'edge[u].dist', edges[u].dist, 'edge[v].dist', edges[v].dist);
                        u = edges[u].parent;
                    }
                }
            } catch (e) {
                console.log('u', u, edges[u], 'v', v, edges[v]);
                throw e;
            }
        }
    } catch (e) {
        console.log('error!', { u, v });
        throw e;
    }
};

const printResult = (edges, aSet) => {
    let sum = 0;

    for (let i = 0; i < aSet.length; i++) {
        for (let j = i + 1; j < aSet.length; j++) {
            const u = aSet[i];
            const v = aSet[j];
            // console.log({u,v,dist:edges[u].hash[v]})
            const newVal = u * v * dist(edges, u, v);

            if (sum > modulo - newVal) {
                sum = sum - (modulo - newVal);
            } else {
                sum += newVal;
            }
            // console.log(u, v, edges[u].hash[v]);
        }
    }
    // console.log(edges);
    console.log(sum);
};

function processData(input) {
    // console.log("input:", input);

    const { edges, sets } = findEdgesAndSets(input);
    // console.log({nullParents});
    for (let aSet of sets) {
        // console.log({aSet});
        if (aSet.length <= 1) {
            console.log(0);
            continue;
        }

        //  console.log("after:", edges);
        printResult(edges, aSet);
    }

    // using search stack from each starting points (given q),
    // search to dest.
    // search stack will have {start:X, dest:Y, edges:N}
    // whenever hitting each node, save distance from starting point in the node.

    // node will contain {hash:{[destid]:distance}, nodes:[n1,n2] }
    // when registering each node, based on the edge information, nodes will have basic
    // information like {[destid]:1}
    // when finding dest node in the node on search, the distance to the dest node will be
    // edges + distance
    // save the distance to dest in starting node and dest node

    // at the end, get all the sets from q
    // return sum(x*y*dist(x,y))%mod(10^9+7)
    // when suming, if prev value > (10^9+7) - newVal,
    // nextVal = prevVal + newVal - (10^9+7)
    // nextVal = prevVal - (10^9+7 - newVal)
}

process.stdin.resume();
process.stdin.setEncoding('ascii');
_input = '';
process.stdin.on('data', function (input) {
    _input += input;
});

process.stdin.on('end', function () {
    processData(_input);
});
