import React, { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Controls, MiniMap, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { useDispatch,useSelector } from 'react-redux';
import { LeadSourceNode } from './LeadSourceNode';
import { SequenceStartNode } from './SequenceStartNode';
import { AddSequence } from './AddSequence';
import { SelectedSource } from './selectedSource.jsx';
import { OutreachNode } from './OutreachNode.jsx';
import { deleteOutreachNode } from '../features/LSContainer/Outreach.js';

export default function FlowContainer() {
  const outreachData = useSelector((state) => state.outreach.outreach);

  const dispatch = useDispatch();

  const [nodeTypes, setNodeTypes] = useState({
    LeadNode: LeadSourceNode,
    selectedSource: SelectedSource,
    SequenceNode: SequenceStartNode,
    AddSeq: AddSequence,
    OutreachNode: OutreachNode,
  });

  const initialNodes = [
    { id: '1', type: 'LeadNode', position: { x: 0, y: 0 }, data: { label: 'Add Lead Source' } },
    { id: '2', type: 'selectedSource', position: { x: -25, y: 200 } },
    { id: '3', type: 'SequenceNode', position: { x: 0, y: 400 }, data: { label: 'Sequence starts from' } },
    { id: '4', type: 'AddSeq', position: { x: 0, y: 600 } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const initialEdges = [
    { id: '2-3', source: '2', target: '3' },
    { id: '3-4', source: '3', target: '4' },
  ];

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const deleteNode = (nodeId) => {
    setNodes((nds) => {
      const updatedNodes = nds.filter((node) => node.id !== nodeId);

      // Check if there are any outreach nodes left
      const remainingOutreachNodes = updatedNodes.filter((node) =>
        node.type.startsWith('outreach')
      );

      // Get the node that should now connect to AddSeq
      const lastNode =
        remainingOutreachNodes.length > 0
          ? remainingOutreachNodes[remainingOutreachNodes.length - 1]
          : updatedNodes.find((node) => node.id === '3'); // SequenceNode

      // Update AddSeq node position dynamically based on the lastNode
      const addSeqNode = updatedNodes.find((node) => node.id === '4');
      if (addSeqNode && lastNode) {
        addSeqNode.position.y = lastNode.position.y + 200;
      }

      dispatch(deleteOutreachNode(nodeId));
      return updatedNodes;

    });

    setEdges((eds) => {
      // Remove edges connected to the deleted node
      const filteredEdges = eds.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );

      // Get the last node to connect to AddSeq
      const updatedNodes = nodes.filter((node) => node.id !== nodeId);
      const remainingOutreachNodes = updatedNodes.filter((node) =>
        node.type.startsWith('outreach')
      );
      const lastNode =
        remainingOutreachNodes.length > 0
          ? remainingOutreachNodes[remainingOutreachNodes.length - 1]
          : updatedNodes.find((node) => node.id === '3'); // SequenceNode

      if (lastNode) {
        // Add edge to connect lastNode to AddSeq
        filteredEdges.push({
          id: `${lastNode.id}-4`,
          source: lastNode.id,
          target: '4',
        });
      }

      return filteredEdges;
    });
  };

  useEffect(() => {
    if (outreachData && outreachData.length > 0) {
      setNodeTypes((prevNodeTypes) => {
        const newNodeTypes = { ...prevNodeTypes };
        outreachData.forEach((node) => {
          const typeName = `outreach-${node.id}`;
          newNodeTypes[typeName] = OutreachNode;
        });
        return newNodeTypes;
      });

      setNodes((prevNodes) => {
        const sequenceStartNode = prevNodes.find((node) => node.id === '3');
        const { x, y } = sequenceStartNode.position;

        const newNodes = outreachData.map((outreachNode, index) => {
          const typeName = `outreach-${outreachNode.id}`;

          return {
            id: outreachNode.id.toString(),
            type: typeName,
            position: { x, y: y + (index + 1) * 200 },
            data: {
              id: outreachNode.id,
              className: outreachNode.className,
              type: outreachNode.type,
              heading: outreachNode.heading,
              delay: {
                value: outreachNode.delay.value,
                unit: outreachNode.delay.unit,
              },
              onDelete: () => deleteNode(outreachNode.id),
            },
          };
        });

        return [
          ...prevNodes.filter((node) => node.id !== '4'),
          ...newNodes,
          { id: '4', type: 'AddSeq', position: { x: 95, y: y + (outreachData.length + 1) * 200 } },
        ];
      });

      setEdges(() => {
        const newEdges = [];
        newEdges.push({ id: '2-3', source: '2', target: '3' }, { id: '3-outreach1', source: '3', target: outreachData[0].id.toString() });

        outreachData.forEach((node, index) => {
          if (index < outreachData.length - 1) {
            newEdges.push({
              id: `outreach${index}-outreach${index + 1}`,
              source: node.id.toString(),
              target: outreachData[index + 1].id.toString(),
            });
          }
        });

        newEdges.push({
          id: `outreach-last-4`,
          source: outreachData[outreachData.length - 1].id.toString(),
          target: '4',
        });

        return newEdges;
      });
    } else {
      // Reset edges to default when no outreach data
      setEdges([
        { id: '3-4', source: '3', target: '4' },
        { id: '2-3', source: '2', target: '3' },
      ]);
    }
  }, [outreachData]);

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'rgb(230, 230, 230)', border : "1px solid grey",borderRadius : "6px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
       
      </ReactFlow>
    </div>
  );
}
