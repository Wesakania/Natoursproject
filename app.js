let fs =  require("fs");
let express =  require("express");
let morgan = require("morgan");
const { error } = require("console");
let app = express();

//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());

app.use((req,res,next)=>{
  console.log("Hello from middleware ✋");
  next();
});

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
});

let port = 3000;

let tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//ROUTE HANDLERS
let getAllTours = (req,res)=>{
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

let getTour = (req,res)=>{
    console.log(req.params);
    let id = req.params.id * 1;
  let tour = tours.find(el => el.id ===id)

  //if(id > tours.length){
    if(!tour){
    return res.status(404).json({status:"fail",message:"Invalid ID"});
}
res.status(200).json({status:"success",data:{tours:tour}});
};  

let creatTour = (req,res)=>{
    console.log(req.body);

let newId = tours[tours.length-1].id + 1;
let newTour = Object.assign({id:newId}, req.body);

tours.push(newTour);

fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
 res.status(201).json({status:"success", data:{tour:newTour}});
});
};

let updateTour = (req,res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({status:"fails",message:"Invalid ID"})
    }
    res.status(200).json({status:"success",data:{
        tour:"<Updated tour here...>"
    }});
}

let deleteTour = (req,res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({status:"fails",message:"Invalid ID"})
    }
    res.status(204).json({status:"success",data:null});
};


let getAllUsers = (req,res)=>{
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!"
    })
}

let getUser = (req,res)=>{
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!"
    })
}

let createUser = (req,res)=>{
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!"
    })
}

let updateUser = (req,res)=>{
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!"
    })
}

let deleteUser = (req,res)=>{
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined!"
    })
}


//ROUTES
let tourRouter = express.Router();
let userRouter = express.Router();



tourRouter
.route("/")
.get(getAllTours)
.post(creatTour);

tourRouter
.route("/:id")
.get(getTour)
.patch(updateTour)
.delete(deleteTour);

userRouter
.route("/")
.get(getAllUsers)
.post(createUser);

userRouter
.route("/:id")
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

app.use("/api/v1/tours",tourRouter);
app.use("/api/v1/users",userRouter);

//SERVER
app.listen(port,()=>{
    console.log(`App server is running on port ${port}....`)
})