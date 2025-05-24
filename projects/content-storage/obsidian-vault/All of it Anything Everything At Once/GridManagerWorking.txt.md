
# GridManagerWorking.txt
using System.Collections.Generic;
using UnityEngine;

public class GridManager : MonoBehaviour
{
	private GridPointSO[,] gridPoints;
	private int gridWidth;
	private int gridHeight;
	private List<GameObject> gridObjects;
	public GameObject gridVisualPrefab;
	private GameObject gridVisual;
	public GameObject TestCube;
	public float spacing;

	private void Awake()
	{
		gridWidth = 10;
		gridHeight = 10;
		gridPoints = new GridPointSO[gridWidth, gridHeight];
		gridObjects = new List<GameObject>();
		spacing = 1f;

		// Initialize grid points
		for (int x = 0; x < gridWidth; x++)
		{
			for (int y = 0; y < gridHeight; y++)
			{
				// Create a new ScriptableObject
				gridPoints[x, y] = ScriptableObject.CreateInstance<GridPointSO>();
				gridPoints[x, y].SetValues(x, y);
			}
		}

		// Create the grid visual object
		gridVisual = Instantiate(gridVisualPrefab, Vector3.zero, Quaternion.identity);
	}

	// Rest of the code remains the same except the following:

	private void UpdateGridVisual()
	{
		LineRenderer lr = gridVisual.GetComponent<LineRenderer>();
		lr.positionCount = 0;

		// Draw horizontal lines (X-axis)
		for (int y = 0; y <= gridHeight; y++)
		{
			for (int x = 0; x <= gridWidth; x++)
			{
				lr.positionCount += 2;
				lr.SetPosition(lr.positionCount - 2, new Vector3(x * spacing, 0, y * spacing));
				lr.SetPosition(lr.positionCount - 1, new Vector3(x * spacing, 0, (y + 1) * spacing));
			}
		}

		// Draw vertical lines (Z-axis)
		for (int x = 0; x <= gridWidth; x++)
		{
			for (int z = 0; z <= gridHeight; z++)
			{
				lr.positionCount += 2;
				lr.SetPosition(lr.positionCount - 2, new Vector3(x * spacing, 0, z * spacing));
				lr.SetPosition(lr.positionCount - 1, new Vector3((x + 1) * spacing, 0, z * spacing));
			}
		}
	}

	public void Start()
	{
		//CreateDynamicGrid(5, 5, 1.0f, TestCube);
	}

	// Remove CreateDynamicGrid method since it's not used anymore
}

public class GridPointSO : ScriptableObject
{
	public int X { get; private set; }
	public int Y { get; private set; }

	public void SetValues(int x, int y)
	{
		X = x;
		Y = y;
	}
}
