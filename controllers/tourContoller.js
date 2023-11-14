let fs =  require("fs");
let tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req,res, next,val)=> {
    console.log(`Tour id is ${val}`);
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:"fails",
            message:"Invalid ID"
        });
    }
    next();
}

exports.getAllTours = (req,res)=>{
    console.log(req.requestTime);
  res.status(200).json({
    status:"success",
    requestedAt:req.requestTime,
    results:tours.length,
    data:{
        tours
    }
});
};

exports.getTour = (req,res)=>{
    console.log(req.params);
    let id = req.params.id * 1;
  let tour = tours.find(el => el.id ===id)
}
exports.creatTour = (req,res)=>{
    console.log(req.body);

let newId = tours[tours.length-1].id + 1;
let newTour = Object.assign({id:newId}, req.body);

tours.push(newTour);

fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
 res.status(201).json({status:"success", data:{tour:newTour}});
});
};

exports.updateTour = (req,res)=>{
    res.status(200).json({status:"success",data:{
        tour:"<Updated tour here...>"
    }});
}

exports.deleteTour = (req,res)=>{
    res.status(204).json({status:"success",data:null});
};
