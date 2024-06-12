import { useState } from "react";

const detailsRecords = [
  {
    id: 1,
    name: "John Doe",
    about: "Nice guy",
    hobby: "Likes drinking milk",
    skills: ["html", "javascript", "redux"],
  },
  {
    id: 2,
    name: "Mary Moe",
    about: "Cute girl",
    hobby: "Likes playing chess",
    skills: ["Fortran", "Lua", "R#"],
  },
];

function UserDetail({ user }) {
  return (
    <tr>
      <th>{user.id}</th>
      <th>{user.name}</th>
      <th>{user.about}</th>
      <th>{user.hobby}</th>
      <th>
        {user.skills.map((s, i) => (
          <span className="tags" key={i}>
            {s},
          </span>
        ))}
      </th>
    </tr>
  );
}

export function UserDetails(props) {
  const [details] = useState(detailsRecords);

  let users = details.map((user, index) => {
    return <UserDetail user={user} key={index} />;
  });

  return (
    <table className="table table-condensed">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>About</th>
          <th>Hobby</th>
          <th>Skills</th>
        </tr>
      </thead>
      <tbody>{users}</tbody>
    </table>
  );
}
