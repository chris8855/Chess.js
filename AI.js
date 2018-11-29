const model = tf.sequential();
const LR = 0.1;
const optimizer = tf.train.sgd(LR);


/*model.add(tf.layers.dense({
  inputShape: 8,
  activation: "sigmoid"
}));
*/

model.add(tf.layers.dense({
  inputShape: [8,8,1],
  units: 5,
  activation: "sigmoid"
}));

model.compile({
  loss: "meanSquaredError",
  optimizer: optimizer
});


let xs =
[[1,2,3,4,5,6,7,8],
 [1,2,3,4,5,6,7,8],
 [1,2,3,4,5,6,7,8],
 [1,2,3,4,5,6,7,8],
 [1,2,3,4,5,6,7,8],
 [1,2,3,4,5,6,7,8],
 [1,2,3,4,5,6,7,8],
 [1,2,3,4,5,6,7,8]];

 let ys = [1,2,3];

 model.fit(xs,ys);
