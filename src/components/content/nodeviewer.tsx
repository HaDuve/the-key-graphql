import React, { useEffect } from "react";
import useLayout from "../../hooks/useLayout.tsx";
import SortableList from "./sortableList.tsx";

const NodeViewer = () => {
  const [order, setOrder] = React.useState([]);
  useEffect(() => {
    // Load sorted items from local storage on component mount
    const savedOrder = localStorage.getItem("order");
    if (!savedOrder) return;
    const parsedOrder = JSON.parse(savedOrder) || [];
    setOrder(parsedOrder);
  }, []);

  const handleSort = (sortedItems) => {
    // save only the order of the items
    const order = sortedItems.map((item) => item.key);
    localStorage.setItem("order", JSON.stringify(order));
    setOrder(order);
  };

  const { loading, nodes, thresholdElementRef, error } = useLayout();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const items =
    nodes.map((edge, index) => ({
      id: index,
      key: index,
      jsxElement: (
        <li
          key={edge.id}
          style={{
            minHeight: "5vh",
            minWidth: "30vw",
            border: "1px solid black",
            margin: "1rem",
            padding: "1rem",
            listStyle: "none",
            backgroundColor: "darkgray",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
          ref={nodes.length === index + 1 ? thresholdElementRef : null}
        >
          {edge.node?.structureDefinition?.title}
        </li>
      ),
    })) || [];

  const customOrder =
    order.length && items.length && items.length === order.length;
  const orderedItems = order.map((key) =>
    items.find((item) => item.key === key)
  );

  return (
    <div>
      <h2>Content Nodes</h2>
      <ul>
        <SortableList
          items={customOrder ? orderedItems : items}
          onSort={handleSort}
        ></SortableList>
      </ul>
    </div>
  );
};

export default NodeViewer;
