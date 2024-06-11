export function SummaryActive(props) {
  return (
    <div>
      Active Users: {props.records.filter((record) => record.active).length}
    </div>
  );
}
