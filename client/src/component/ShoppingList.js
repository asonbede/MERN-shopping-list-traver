import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);

// import React, {Component} from "react";
// import {Container,ListGroup,ListGroupItem,Button} from  "reactstrap";
// import {TransitionGroup, CSSTransition}  from  "react-transition-group";
// import {connect} from "react-redux";
// import {getItems} from "../actions/itemActions";
// import PropTypes from "prop-types";
// import {deleteItem}  from "../actions/itemActions";
// //import uuid from "uuid";
// class ShoppingList extends Component{
//    componentDidMount(){
//        this.props.getItems();
//    }

//    onDeleteClick= id => {
//        this.props.deleteItem(id);
//    }
//     // state = {
//     //     item: [
//     //            {id: uuid(), name: "Egg"},
//     //            {id: uuid(), name: "Milk"},
//     //            {id: uuid(), name: "Steak"},
//     //            {id: uuid(), name: "Water"}

//     //     ]
//     // }

// render(){
//  const {items} = this.props.item;
//  return (
//      <Container>
//          {/* <Button color="dark" style={{marginBottom:"2rem"}}  onClick= {()=>{
//              const name = prompt("Enter Item");
//              if(name){
//                  this.setState(state=>({
//                      item:[...state.item,{id:uuid(),name}]
//                  }))
//              }
//          }} >Add Item</Button> */}
//          <ListGroup>
//              <TransitionGroup className="shopping-list">
//                  {items.map(({_id,name})=>(
//                     <CSSTransition key={_id}  timeout={500} classNames="fade">
//                         <ListGroupItem><Button  className="remove-btn"  color="danger" size="sm" onClick={this.onDeleteClick.bind(this,_id)} >&times;</Button>
//                         {name}</ListGroupItem>
//                     </CSSTransition>
//                  ))

//                  }

//              </TransitionGroup>
//          </ListGroup>

//      </Container>
//  )

// }

// }
// ShoppingList.propTypes = {
//     getItems: PropTypes.func.isRequired,
//     item: PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => (
//     {
//         item: state.item
//     }
// )

// export default connect(mapStateToProps,{getItems,deleteItem}) (ShoppingList);
