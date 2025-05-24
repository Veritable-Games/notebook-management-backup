
# oldGridManager.txt
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GridManager : MonoBehaviour
{
	public int gridWidth = 10;
	public int gridHeight = 10;
	public int gridDepth = 10;
	public float spacing = 1f;
	public Material lineMaterial;
	public bool showGrid = true;
	public KeyCode toggleGridKey = KeyCode.H;
	public bool snapEnabled = true;

	private GameObject gridContainer;
	private GameObject currentBoundingBox;
	public LineRenderer lineRendererPrefab; // Assign a LineRenderer prefab in the Unity Inspector
	private LineRenderer currentLineRenderer;


	private Bounds gridBounds;

	private List<GameObject> objectsInGrid = new List<GameObject>();

	private void Start()
	{
		gridContainer = new GameObject("GridContainer");
		gridContainer.transform.SetParent(transform);

		DrawGrid(gridWidth, gridHeight, gridDepth, spacing);

		if (!showGrid)
		{
			gridContainer.SetActive(false);
		}

		// Initialize bounding box line renderer
		currentLineRenderer = Instantiate(lineRendererPrefab);
		UpdateBoundingBox();
	}

	private void Update()
	{
		if (Input.GetKeyDown(KeyCode.G) || Input.GetKeyDown(toggleGridKey))
		{
			ToggleGridVisibility();
		}

		// Update the bounding box every frame
		UpdateBoundingBox();

		// Snap this object to the grid
		if (snapEnabled)
		{
			Vector3 snappedPosition = SnapToNearestGridPoint(transform.position);
			transform.position = snappedPosition;
		}
	}

	// Draws the 3D grid lines
	private void DrawGrid(int gridWidth, int gridHeight, int gridDepth, float spacing)
	{
		for (int x = 0; x <= gridWidth; x++)
		{
			for (int y = 0; y <= gridHeight; y++)
			{
				DrawLine(new Vector3(x * spacing, y * spacing, 0), new Vector3(x * spacing, y * spacing, gridDepth * spacing));
			}
		}

		for (int x = 0; x <= gridWidth; x++)
		{
			for (int z = 0; z <= gridDepth; z++)
			{
				DrawLine(new Vector3(x * spacing, 0, z * spacing), new Vector3(x * spacing, gridHeight * spacing, z * spacing));
			}
		}

		for (int z = 0; z <= gridDepth; z++)
		{
			for (int y = 0; y <= gridHeight; y++)
			{
				DrawLine(new Vector3(0, y * spacing, z * spacing), new Vector3(gridWidth * spacing, y * spacing, z * spacing));
			}
		}
	}

	// Draws a single line
	private void DrawLine(Vector3 start, Vector3 end)
	{
		GameObject lineObj = new GameObject("Line");
		lineObj.transform.SetParent(gridContainer.transform);

		LineRenderer lr = lineObj.AddComponent<LineRenderer>();
		lr.material = lineMaterial;
		lr.startWidth = 0.05f;
		lr.endWidth = 0.05f;

		lr.SetPosition(0, start);
		lr.SetPosition(1, end);
	}

	// Snaps a position to the nearest grid point
	public Vector3 SnapToNearestGridPoint(Vector3 position)
	{
		return new Vector3(
			Mathf.Round(position.x / spacing) * spacing,
			Mathf.Round(position.y / spacing) * spacing,
			Mathf.Round(position.z / spacing) * spacing
		);
	}

	// Toggles the grid's visibility
	public void ToggleGridVisibility()
	{
		showGrid = !showGrid;
		gridContainer.SetActive(showGrid);
	}

	private void UpdateBoundingBox()
	{
		// Create 8 vertices of the bounding box
		Vector3[] vertices = new Vector3[8];

		// Bottom vertices
		vertices[0] = SnapToNearestGridPoint(new Vector3(0, 0, 0));
		vertices[1] = SnapToNearestGridPoint(new Vector3(gridWidth * spacing, 0, 0));
		vertices[2] = SnapToNearestGridPoint(new Vector3(gridWidth * spacing, 0, gridDepth * spacing));
		vertices[3] = SnapToNearestGridPoint(new Vector3(0, 0, gridDepth * spacing));

		// Top vertices
		vertices[4] = SnapToNearestGridPoint(new Vector3(0, gridHeight * spacing, 0));
		vertices[5] = SnapToNearestGridPoint(new Vector3(gridWidth * spacing, gridHeight * spacing, 0));
		vertices[6] = SnapToNearestGridPoint(new Vector3(gridWidth * spacing, gridHeight * spacing, gridDepth * spacing));
		vertices[7] = SnapToNearestGridPoint(new Vector3(0, gridHeight * spacing, gridDepth * spacing));

		// Connect vertices to form the bounding box
		currentLineRenderer.positionCount = 16;
		currentLineRenderer.SetPositions(new Vector3[]
		{
			vertices[0], vertices[1], vertices[2], vertices[3], vertices[0],
			vertices[4], vertices[5], vertices[6], vertices[7], vertices[4],
			vertices[1], vertices[5], vertices[2], vertices[6], vertices[3], vertices[7]
		});
	}
}

