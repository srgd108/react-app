import "bootstrap/dist/css/bootstrap.css";
import PropTypes from "prop-types";
import {
  useState,
  useCallback,
  useRef,
  useEffect,
  cloneElement,
  memo,
} from "react";

const dataSource = [
  { firstName: "John", lastName: "Doe", active: false },
  { firstName: "Mary", lastName: "Moe", active: false },
  { firstName: "Peter", lastName: "Noname", active: true },
];

GridRecord.propTypes = {
  record: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }),
};

function GridRecord({ record, toggleActive, index }) {
  return (
    <tr>
      <th>{record.firstName}</th>
      <th>{record.lastName}</th>
      <th>
        <input
          type="checkbox"
          checked={record.active}
          onChange={() => toggleActive(index)}
        />
      </th>
    </tr>
  );
}

GridRecord.defaultProps = {
  record: { firstName: "N/A", lastName: "N/A", active: false },
};

const MemoGridRecord = memo(GridRecord);

export function GridComponent({ children }) {
  const [records, setRecords] = useState(dataSource);
  const toggle = useCallback(toggleActive, [records]);

  function toggleActive(index) {
    // if change the active flag inside record, we must replace the record itself
    records[index] = { ...records[index], active: !records[index].active };

    //records[index].active = !records[index].active ; // <== DON’T DO LIKE THIS!
    setRecords([...records]);
  }

  function handleFilterChange(e) {
    let value = e.target.value;
    setRecords(
      dataSource.filter((record) =>
        record.firstName.toUpperCase().includes(value.toUpperCase())
      )
    );
  }

  let recordsGrid = records.map((record, index) => {
    return (
      <MemoGridRecord
        record={record}
        key={index}
        index={index}
        toggleActive={toggle}
      />
    );
  });

  let filterInput = useRef(null);
  useEffect(() => {
    filterInput.current.focus();
  }, []);

  return (
    <div style={{ width: 300, height: 300, padding: 20 }}>
      <p>
        <input
          type="text"
          ref={filterInput}
          placeholder="Filter by..."
          onChange={handleFilterChange}
        />
      </p>
      <table className="table table-condensed">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>{recordsGrid}</tbody>
      </table>
      <div>{children && cloneElement(children, { records: records })}</div>
    </div>
  );
}
