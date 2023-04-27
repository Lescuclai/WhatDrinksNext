import React, { Component } from "react";
import { View, Text } from "react-native";
// import { connect } from "react-redux";
// import UUIDGenerator from "react-native-uuid-generator";

// import { addBeer } from "../../actions";
// import foam from "../../assets/hop.jpg";

import Header from "../homePage/Header";
// import BeerAddForm from "./BeerAddForm";

// class AddBeer extends Component {
//   handleBeerAddFormSubmit = (evt, values) => {
//     evt.preventDefault();
//     UUIDGenerator.getRandomUUID().then((uid) => {
//       // First, add the beer.
//       this.props.addBeer({
//         uid: uid,
//         createdAt: Date.now(),
//         edited: true,
//         editedAt: null,
//         deletedAt: null,
//         photo: { foam },
//         ...values,
//       });

//       //Then, redirect back to BeersList.
//       // this.props.navigation.navigate("BeerList");
//     });
//   };

//   render() {
//     return (
//       <View>
//         <Header name="New beer"></Header>
//         <View>
//           <BeerAddForm onSubmit={this.handleBeerAddFormSubmit} />
//           {/* <BeerAddForm /> */}
//         </View>
//       </View>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addBeer: (data) => dispatch(addBeer(data)),
//   };
// };

// export default connect(null, mapDispatchToProps)(AddBeer);
// // export default AddBeer;

// {
//   /* <Field
//               name="brewery"
//               label="Brewery"
//               autoCorrect={false}
//               component={TextInput}
//             />
//             <Field
//               name="style"
//               label="Style"
//               autoCorrect={false}
//               component={TextInput}
//               validate={[required]}
//             />
//             <Field
//               name="abv"
//               label="ABV (%)"
//               keyboardType="numeric"
//               autoCorrect={false}
//               component={TextInput}
//               validate={[required, number, positive]}
//               normalize={floatWithPoint}
//               hasNormalize={true}
//               warn={abvWarning}
//             />
//             <FieldArray name="aromas" component={this.renderAromasFields} />
//             <Field
//               name="comment"
//               label="Comment"
//               autoCorrect={true}
//               multiline={true}
//               component={TextInput}
//             />
//             <Field
//               name="rating"
//               label="Rating"
//               keyboardType="numeric"
//               autoCorrect={false}
//               component={TextInput}
//               validate={[required, number, positive, rating]}
//               normalize={floatWithPoint}
//               hasNormalize={true}
//             /> */
// }

export default function AddBeer() {
  return (
    <View>
      <Header name='New beer'></Header>
      <Text>tototo</Text>
    </View>
  );
}
