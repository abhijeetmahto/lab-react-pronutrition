import React, { Component } from 'react';

class FoodBox extends Component{
    constructor(props){
        super(props);
        this.state ={
            foods: [
                { name:"Pizza", cals:"400", img:"https://i.imgur.com/eTmWoAN.png"},
                { name:"Orange", cals:"65", img:"https://pngimg.com/uploads/orange/orange_PNG800.png"},
                { name:"Noodles", cals:"100", img:"https://pngimg.com/uploads/noodle/noodle_PNG48.png"},
                { name:"Pastry", cals:"551", img:"https://i.imgur.com/DAnEKQS.jpeg"},
                { name:"Banana", cals:"105", img:"https://pngimg.com/uploads/banana/banana_PNG827.png"},
            ],
            search:"",//User data to be searched
            cal_count:0,
            myFood:[]
        }
    }
    searchFood = (event) =>{
        this.setState({
            search: event.target.value
        })
    }
    capatalize = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    addFood = (event) => {
        let count = document.getElementById(event.target.value).value;
        let cal = this.state.foods.filter((food) => {
            return food.name === event.target.value;
        });
        let foodobj = {
            id:event.target.value,
            text:`${count} ${event.target.value} = ${(cal[0].cals) * count}`,
            btn_id: `${event.target.value}R`,
            ca: cal[0].cals * count
        }
        this.setState({
            myFood: this.state.myFood.concat(foodobj),
            cal_count: this.state.cal_count + (cal[0].cals * count)
        })
    }

    removeFruit = (event) => {
        document.getElementById(event.target.value).remove();
        let calorie = this.state.myFood.filter((food) => {
            return `${food.id}R` === event.target.value
        })
        this.setState({
            cal_count: this.state.cal_count - calorie[0].ca
        })
    }
    render(){
        return(
            <div className="main_box">
               <div className='search_box'>
                   <h1>Search Food</h1>
                   <input type="text" placeholder='Find the Food' onChange={this.searchFood} id="search"/>
               </div><br></br><br></br>
               <div className='food_box'>
                   <div className='container'>
                       {this.state.foods.filter((food) => {
                           return food.name.includes(this.state.search);
                       }).map((food) => {
                           return <div key={food.name} className="food">
                               <img src={food.img} alt="error"/>
                               <div className='details'>
                                   <h1>{this.capatalize(food.name)}</h1>
                                   <h3>{food.cals}</h3>
                               </div>
                               <div className='count'>
                                   <input type="number" defaultValue="1" id={food.name} min="0"/>
                                   <button onClick={this.addFood} value={food.name}>+</button>
                                   </div>
                               </div>
                       })}
                   </div>
                   <br></br><br></br>
                   <div className='details_container'>
                       <h1>Todays's Food {this.state.cal_count} Calories</h1>
                       {this.state.myFood.filter((food) => {
                           return food.text !== "";                       
                           }).map((food) => {
                               return <div key={food.id} className="item" id={food.btn_id}>
                                   <span>{food.text}</span>
                                   <button onClick={this.removeFruit} value={food.btn_id}>X</button>
                               </div>
                           })
                           }
                   </div>
               </div>
            </div>
        );
    }

}
export default FoodBox;