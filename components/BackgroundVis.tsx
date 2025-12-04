import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const BackgroundVis = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.attr('width', width).attr('height', height);
    svg.selectAll("*").remove(); // Clear previous

    // Generate random nodes
    const nodeCount = 40;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    }));

    // Draw lines
    const links = [];
    for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
            if (Math.random() > 0.9) {
                links.push({ source: i, target: j });
            }
        }
    }
    
    // Group for the visualization to sit behind
    const g = svg.append('g').attr('class', 'network');

    const linkSelection = g.selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke', '#06b6d4')
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.1);

    const nodeSelection = g.selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', d => d.r)
        .attr('fill', '#22d3ee')
        .attr('opacity', 0.4);

    const timer = d3.timer(() => {
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });

      nodeSelection
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      linkSelection
        .attr('x1', d => nodes[d.source].x)
        .attr('y1', d => nodes[d.source].y)
        .attr('x2', d => nodes[d.target].x)
        .attr('y2', d => nodes[d.target].y);
    });

    return () => {
      timer.stop();
    };
  }, []);

  return (
    <svg 
      ref={svgRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"
    />
  );
};
