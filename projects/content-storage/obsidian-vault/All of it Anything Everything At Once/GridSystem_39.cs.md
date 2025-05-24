
# GridSystem 39.cs
using System.Collections.Generic;
using UnityEngine;

public class GridSystem_39 : MonoBehaviour
{
	public float cellSize = 1f; // You can set this to whatever size you want your grid cells to be
	public List<Collider> colliders; // Set this in the inspector to include all relevant colliders

	private class GridCell
	{
		// Add fields here for any information you want to store about each grid cell
	}

	void Start()
	{
		Bounds bounds = new Bounds();
		foreach (Collider collider in colliders)
		{
			bounds.Encapsulate(collider.bounds);
		}

		int xSize = Mathf.CeilToInt(bounds.size.x / cellSize);
		int ySize = Mathf.CeilToInt(bounds.size.y / cellSize);
		int zSize = Mathf.CeilToInt(bounds.size.z / cellSize);

		GridCell[,,] grid = new GridCell[xSize, ySize, zSize];

		LineRenderer lineRenderer = gameObject.AddComponent<LineRenderer>();
		List<Vector3> points = new List<Vector3>();

		for (int x = 0; x <= xSize; x++)
		{
			for (int y = 0; y <= ySize; y++)
			{
				for (int z = 0; z <= zSize; z++)
				{
					Vector3 position = bounds.min + new Vector3(x * cellSize, y * cellSize, z * cellSize);
					if (x < xSize) // Draw line in the x direction
					{
						points.Add(position);
						points.Add(position + new Vector3(cellSize, 0, 0));
					}
					if (y < ySize) // Draw line in the y direction
					{
						points.Add(position);
						points.Add(position + new Vector3(0, cellSize, 0));
					}
					if (z < zSize) // Draw line in the z direction
					{
						points.Add(position);
						points.Add(position + new Vector3(0, 0, cellSize));
					}
					grid[x, y, z] = new GridCell();
				}
			}
		}

		lineRenderer.positionCount = points.Count;
		lineRenderer.SetPositions(points.ToArray());
	}
}
