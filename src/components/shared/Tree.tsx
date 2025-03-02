"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useCenteredTree } from "@/lib/helper";
import { json } from "stream/consumers";
const D3Tree = dynamic(() => import("react-d3-tree"), { ssr: false });

let orgChart = {'name': 'Root', 'attributes': {'ucb': 97.05779300938882, 'visit_count': 100, 'state': JSON.stringify([[-1.,  0.,  0.,  0., -1.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': [{'name': '((0, 0), (2, 2))', 'attributes': {'ucb': 87.74173482966665, 'visit_count': 89, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': [{'name': '(2, 1)', 'attributes': {'ucb': 106.71832873139726, 'visit_count': 5, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],      
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  1., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': [{'name': '((4, 0), (3, 1))', 'attributes': {'ucb': 90.99897503394686, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  1., -1.,  0.,  0.],
  [ 0., -1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (3, 3))', 'attributes': {'ucb': 110.99895503396687, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0.,  0.,  0., -1.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 0), (4, 1))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  1., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0., -1.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (2, 3))', 'attributes': {'ucb': 120.99894503397687, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  1.,  0., -1.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}]}, {'name': '(2, 4)', 'attributes': {'ucb': 110.99895503396687, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '(0, 3)', 'attributes': {'ucb': 103.73009252725738, 'visit_count': 17, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.], 
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': [{'name': '((0, 4), (0, 2))', 'attributes': {'ucb': 70.99899503392686, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 0), (3, 0))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (1, 2))', 'attributes': {'ucb': 110.99895503396687, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (3, 2))', 'attributes': {'ucb': 115.99895003397187, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 0), (3, 1))', 'attributes': {'ucb': 95.99897003395186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0., -1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (1, 1))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0., -1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (2, 1))', 'attributes': {'ucb': 115.99895003397187, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0., -1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 4), (3, 3))', 'attributes': {'ucb': 95.99897003395186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0., -1.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '((2, 2), (3, 1))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0., -1.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((0, 4), (1, 3))', 'attributes': {'ucb': 95.99897003395186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1.,  0.],
  [ 0.,  0.,  0., -1.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 4), (3, 4))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0., -1.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '((0, 4), (1, 4))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1.,  0.],
  [ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (2, 3))', 'attributes': {'ucb': 115.99895003397187, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0., -1.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 4), (4, 3))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0., -1.,  0.]])}, 'children': []}, {'name': '((2, 2), (3, 3))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0., -1.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 0), (4, 1))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0., -1.,  0.,  0., -1.]])}, 'children': []}]}, {'name': '(1, 1)', 'attributes': {'ucb': 105.88932956210125, 'visit_count': 2, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': [{'name': '((4, 4), (4, 3))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0., -1.,  0.]])}, 'children': []}]}, {'name': '(4, 1)', 'attributes': {'ucb': 105.76115539956658, 'visit_count': 4, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  1.,  0.,  0., -1.]])}, 'children': [{'name': '((4, 0), (3, 1))', 'attributes': {'ucb': 95.99897003395186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0., -1.,  0.,  0.,  0.],
  [ 0.,  1.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 0), (3, 0))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.],
  [ 0.,  1.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (2, 1))', 'attributes': {'ucb': 115.99895003397187, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0., -1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  1.,  0.,  0., -1.]])}, 'children': []}]}, {'name': '(1, 2)', 'attributes': {'ucb': 110.88932706210251, 'visit_count': 2, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  1.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': [{'name': '((2, 2), (2, 1))', 'attributes': {'ucb': 115.99895003397187, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  1.,  0.,  0.],
  [ 0., -1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}]}, {'name': '(3, 1)', 'attributes': {'ucb': 105.68336991423944, 'visit_count': 6, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  1.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': [{'name': '((4, 0), (4, 1))', 'attributes': {'ucb': 100.99896503395686, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0., -1.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 4), (4, 3))', 'attributes': {'ucb': 100.99896503395686, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  1.,  0.,  0.,  0.],
  [-1.,  0.,  0., -1.,  0.]])}, 'children': []}, {'name': '((2, 2), (2, 3))', 'attributes': {'ucb': 115.99895003397187, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0., -1.,  0.],
  [ 0.,  1.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 4), (3, 4))', 'attributes': {'ucb': 100.99896503395686, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  1.,  0.,  0., -1.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '((2, 2), (1, 2))', 'attributes': {'ucb': 115.99895003397187, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  1.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}]}, {'name': '(4, 2)', 'attributes': {'ucb': 110.99895503396687, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  1.,  0., -1.]])}, 'children': []}, {'name': '(3, 4)', 'attributes': {'ucb': 56.604391793625496, 'visit_count': 33, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.], 
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  1.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': [{'name': '((2, 2), (3, 3))', 'attributes': {'ucb': 100.99896503395686, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0., -1.,  1.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 4), (4, 3))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  1.],
  [-1.,  0.,  0., -1.,  0.]])}, 'children': []}, {'name': '((4, 4), (2, 4))', 'attributes': {'ucb': 4.879964264949358, 'visit_count': 16, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': [{'name': '(3, 3)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],      
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  0.,  0.,  1.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '(3, 0)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 1.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '(4, 3)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  1.,  0.]])}, 'children': []}, {'name': '(4, 2)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  1.,  0.,  0.]])}, 'children': []}, {'name': '(0, 3)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  1., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '(2, 3)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  1., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '(0, 1)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  1.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '(1, 2)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  1.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '(3, 1)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  1.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '(2, 1)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  1., -1.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '(4, 1)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  1.,  0.,  0.,  0.]])}, 'children': []}, {'name': '(0, 0)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 1.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '(1, 3)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  1.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '(3, 2)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  0.,  1.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '(4, 4)', 'attributes': {'ucb': 0.9990650338568453, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  1.]])}, 'children': []}]}, {'name': '((0, 4), (0, 3))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0., -1.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  1.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (1, 2))', 'attributes': {'ucb': 115.99895003397187, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  1.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((0, 4), (1, 3))', 'attributes': {'ucb': 95.99897003395186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0., -1.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  1.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 4), (3, 3))', 'attributes': {'ucb': 95.99897003395186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0., -1.,  1.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '((4, 0), (3, 0))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  1.],
  [ 0.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 0), (4, 1))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  1.],
  [ 0., -1.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (2, 1))', 'attributes': {'ucb': 115.99895003397187, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0., -1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  1.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 0), (3, 1))', 'attributes': {'ucb': 95.99897003395186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0., -1.,  0.,  0.,  1.],
  [ 0.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (1, 1))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0., -1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  1.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (2, 3))', 'attributes': {'ucb': 110.99895503396687, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0., -1.,  0.],
  [ 0.,  0.,  0.,  0.,  1.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (1, 3))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0., -1.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  1.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (3, 1))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0., -1.,  0.,  0.,  1.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (3, 2))', 'attributes': {'ucb': 115.99895003397187, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  1.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((0, 4), (1, 4))', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  1.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}]}, {'name': '(3, 0)', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 1.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '(3, 2)', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  1.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '(2, 0)', 'attributes': {'ucb': 110.99895503396687, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 1.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '(3, 3)', 'attributes': {'ucb': 106.71832873139726, 'visit_count': 5, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  1.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': [{'name': '((0, 4), (1, 4))', 'attributes': {'ucb': 100.99896503395686, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  1.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((0, 4), (0, 3))', 'attributes': {'ucb': 100.99896503395686, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0., -1.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  1.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (2, 1))', 'attributes': {'ucb': 115.99895003397187, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0., -1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  1.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((2, 2), (1, 2))', 'attributes': {'ucb': 115.99895003397187, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  1.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}]}, {'name': '(0, 1)', 'attributes': {'ucb': 110.99895503396687, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  1.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '(0, 0)', 'attributes': {'ucb': 110.99895503396687, 'visit_count': 1, 'state': JSON.stringify([[ 1.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '(4, 3)', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  1., -1.]])}, 'children': []}, {'name': '(1, 3)', 'attributes': {'ucb': 105.88932956210125, 'visit_count': 2, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  1.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': [{'name': '((2, 2), (1, 2))', 'attributes': {'ucb': 110.99895503396687, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 0.,  0., -1.,  1.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}]}, {'name': '(1, 0)', 'attributes': {'ucb': 110.99895503396687, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [ 1.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '(2, 3)', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  1.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '(1, 4)', 'attributes': {'ucb': 105.99896003396186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  1.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '(0, 2)', 'attributes': {'ucb': 110.99895503396687, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  1.,  0., -1.],  
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0., -1.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}]}, {'name': '((4, 0), (3, 1))', 'attributes': {'ucb': 165.99890003402186, 'visit_count': 1, 'state': JSON.stringify([[-1.,  0.,  0.,  0., -1.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0., -1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 4), (3, 4))', 'attributes': {'ucb': 175.99889003403186, 'visit_count': 1, 'state': JSON.stringify([[-1.,  0.,  0.,  0., -1.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0., -1.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '((0, 0), (1, 0))', 'attributes': {'ucb': 175.99889003403186, 'visit_count': 1, 'state': JSON.stringify([[ 0.,  0.,  0.,  0., -1.],
  [-1.,  1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((0, 0), (0, 1))', 'attributes': {'ucb': 175.99889003403186, 'visit_count': 1, 'state': JSON.stringify([[ 0., -1.,  0.,  0., -1.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 0), (3, 0))', 'attributes': {'ucb': 175.99889003403186, 'visit_count': 1, 'state': JSON.stringify([[-1.,  0.,  0.,  0., -1.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 0), (4, 1))', 'attributes': {'ucb': 175.99889003403186, 'visit_count': 1, 'state': JSON.stringify([[-1.,  0.,  0.,  0., -1.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0., -1.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 4), (3, 3))', 'attributes': {'ucb': 165.99890003402186, 'visit_count': 1, 'state': JSON.stringify([[-1.,  0.,  0.,  0., -1.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0., -1.,  0.],
  [-1.,  0.,  0.,  0.,  0.]])}, 'children': []}, {'name': '((0, 4), (0, 3))', 'attributes': {'ucb': 175.99889003403186, 'visit_count': 1, 'state': JSON.stringify([[-1.,  0.,  0., -1.,  0.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((4, 4), (4, 3))', 'attributes': {'ucb': 175.99889003403186, 'visit_count': 1, 'state': JSON.stringify([[-1.,  0.,  0.,  0., -1.],
  [ 0.,  1.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0., -1.,  0.]])}, 'children': []}, {'name': '((0, 4), (1, 4))', 'attributes': {'ucb': 175.99889003403186, 'visit_count': 1, 'state': JSON.stringify([[-1.,  0.,  0.,  0.,  0.],
  [ 0.,  1.,  0.,  0., -1.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}, {'name': '((0, 4), (1, 3))', 'attributes': {'ucb': 165.99890003402186, 'visit_count': 1, 'state': JSON.stringify([[-1.,  0.,  0.,  0.,  0.],
  [ 0.,  1.,  0., -1.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [ 0.,  0.,  0.,  0.,  0.],
  [-1.,  0.,  0.,  0., -1.]])}, 'children': []}]}

  const renderRectSvgNode = ({ nodeDatum, toggleNode }: any) => {
    let state = [];
  
    try {
      if (nodeDatum?.attributes?.state) {
        state = JSON.parse(nodeDatum.attributes.state);
      }
    } catch (error) {
      console.error("Invalid JSON in node state:", error);
    }
  
    const cellSize = 15; // Size of each cell
    const circleRadius = 4; // Radius of the circle
    const gridSize = state.length || 5; // Default grid size if state is missing
    const offset = (cellSize * gridSize) / 2; // Offset to center the grid
    const textOffsetY = -offset - 10; // Move text above the grid
    const isRootNode = nodeDatum.depth === 0; // Detect if it's the root node
  
    return (
      <g onClick={toggleNode}>
        {/* Display text above the grid */}

  
        {/* Draw grid only if state is available */}
        {state.length > 0 &&
          state.map((row: number[], rowIndex: number) =>
            row.map((value: number, colIndex: number) => {
              const x = colIndex * cellSize - offset + cellSize / 2;
              const y = rowIndex * cellSize - offset + cellSize / 2;
              return (
                <g key={`${rowIndex}-${colIndex}`} style={{ strokeWidth: "1", fontWeight: "normal" }}>
                  {/* Draw grid cell */}
                  <rect
                    x={x - cellSize / 2}
                    y={y - cellSize / 2}
                    width={cellSize}
                    height={cellSize}
                    fill="white"
                    stroke="black"
                    strokeWidth="1" // Force a consistent stroke width
                  />
                  {/* Draw circle for -1 (Red) or 1 (Green) */}
                  {value !== 0 && (
                    <circle cx={x} cy={y} r={circleRadius} fill={value === -1 ? "red" : "green"} />
                  )}
                </g>
              );
            })
          )}
                  <text
          x={0}
          y={textOffsetY}
          textAnchor="middle"
          key={nodeDatum.name}
          fontSize="6"
          style={{ fontWeight: "light", strokeWidth: 0.3 }} // Extra enforcement
        >
          Visit Count: {nodeDatum?.attributes?.visit_count}, UCB: {nodeDatum?.attributes?.ucb}
        </text>
        {
          nodeDatum?.children?.length &&
        <text
          x={0}
          y={textOffsetY+7}
          textAnchor="middle"
          key={nodeDatum.name}
          fontSize="4"
          style={{ fontWeight: "light", strokeWidth: 0.3 }} // Extra enforcement
        >
          Children: {nodeDatum?.children?.length}
        </text>
        }
      </g>
    );
  };
  
  
  
  
  
  export default function OrgChartTree() {
    const [dimensions, translate, containerRef] = useCenteredTree();
    return (
      <div ref={containerRef as any} className="w-[100vw] h-[100vh] flex justify-center items-center">
          <D3Tree
            data={orgChart}
            orientation="vertical"
            translate={translate as any}
            dimensions={dimensions as any} 
            renderCustomNodeElement={renderRectSvgNode}
            
          />
      </div>
    );
  }
  