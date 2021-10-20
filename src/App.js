import React, { useState } from "react";
import "./styles.css";

const products = [
	{
		id: 1,
		name: "Coffee Mug",
		price: 70,
	},
	{
		id: 2,
		name: "Box",
		price: 10,
	},
	{
		id: 3,
		name: "Bottol",
		price: 40,
	},
];

const App = () => {
	const [items, setItems] = useState(products);

	const [totalCartPrice, setTotalCartPrice] = useState(0);
	const [totalCartCount, setTotalCartCount] = useState(0);

	const addCartItem = (id) => {
		const newItemsList = items.map((item) => {
			if (id === item.id) {
				setTotalCartPrice((prev) => prev + item.price);
				setTotalCartCount((prev) => prev + 1);

				return { ...item, countInCart: (item?.countInCart || 0) + 1 };
			}

			return item;
		});

		setItems(newItemsList);
	};

	const removeCartItem = (id) => {
		if (items.some((item) => (item.id === id ? !!item.countInCart : false))) {
			const newItemsList = items.map((item) => {
				if (id === item.id) {
					if (totalCartCount) setTotalCartPrice((prev) => prev - item.price);
					if (totalCartCount) setTotalCartCount((prev) => prev - 1);
					return { ...item, countInCart: (item?.countInCart || 0) - 1 };
				}
				return item;
			});
			setItems(newItemsList);
		} else {
			alert("please add item in cart first");
		}
	};

	return (
		<div>
			<section>Cart Items - {totalCartCount}</section>
			<section>Total Cart Price - {totalCartPrice}</section>
			<table>
				<thead>
					<tr>
						<th>Items</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.id}>
							<td>{item.name}</td>
							<td>{item.price}</td>
							<td>
								<button onClick={() => addCartItem(item.id)}>+</button>
								<span>{item?.countInCart || 0}</span>
								<button onClick={() => removeCartItem(item.id)}>-</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

// class App extends Component {
//   state = {
//     items: products,
//   };

//   render() {
//     return (
//       <div>
//         <section>Cart Items - 0</section>
//         <section>Total Cart Price - 0</section>
//         <table>
//           <thead>
//             <tr>
//               <th>Items</th>
//               <th>Price</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.items.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.name}</td>
//                 <td>{item.price}</td>
//                 <td>
//                   <button>+</button>
//                   <span>0</span>
//                   <button>-</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

export default App;
