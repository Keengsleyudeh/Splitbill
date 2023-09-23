import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddfriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriends(friend) {
    setFriends((friends) => ([...friends, friend]));
    setShowAddFriend(false)
  }

  function handleSelectedFriend(friend) {

    setSelectedFriend((selected)=> 
    (selected?.id===friend.id? null: friend))
    setShowAddFriend(false)
  }

  return (
    <div className="app">
      <div className="sidebar">

        <FriendList 
        friends={friends} 
        onSelectedFriend={handleSelectedFriend}
        selectedFriend={selectedFriend} 
        />

        {showAddFriend && 
        <FormAddFriend 
        onAddFriends={handleAddFriends} 
        />}

        <Button 
        onClick={handleShowAddfriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend &&  
      <FormSplitBill 
      selectedFriend={selectedFriend}
      />}
    </div>
  );
}

function FriendList({friends, onSelectedFriend, selectedFriend}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend 
        friend={friend} 
        key={friend.id} 
        selectedFriend={selectedFriend}
        onSelectedFriend={onSelectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({friend, onSelectedFriend, selectedFriend}) {
  const isSelect = selectedFriend?.id ===friend.id
  return (
    <li className={isSelect? 'selected': ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p className="black">You and {friend.name} are even</p>
      )}

      <Button onClick={()=>onSelectedFriend(friend)}>{isSelect? "Close": "Select"}</Button>
    </li>
  );
}

function FormAddFriend({onAddFriends}) {
  const [name, setName] = useState('');
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriends(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👨🏼‍🤝‍👨🏻 Add Friend</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📷 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button onAddFriends={onAddFriends}>Add</Button>
    </form>
  );
}

function FormSplitBill({selectedFriend}) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💴 Bill value</label>
      <input type="text" />

      <label>🤵 Your expense</label>
      <input type="text" />

      <label>👨🏼‍🤝‍👨🏻 {selectedFriend.name}'s expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the money?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Add</Button>
    </form>
  );
}