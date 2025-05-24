
# combine text files.sh
#!/bin/bash

# Set the base directory
base_dir="/media/user/External/VOICE/0COMPLETE"

# Function to combine text files in a directory
combine_text_files() {
	local folder_path="$1/nano_files"
	local output_file="$folder_path/combined_output.txt"

	# Create or empty the output file
	: > "$output_file"

	# Loop through each text file in the directory
	for file in "$folder_path"/*.txt; do
		if  -f "$file" ; then
			# Write the file name as a separator
			echo "==# $(basename "$file")==" >> "$output_file"
			# Append the contents of the file
			cat "$file" >> "$output_file"
			echo -e "\n" >> "$output_file"
		fi
	done
}

# Loop through each folder in the base directory
for folder in "$base_dir"/*/; do
	for subfolder in "$folder"*/; do
		# Check if the nano_files directory exists
		if [ -d "$subfolder/nano_files" ]; then
			# Combine text files in the nano_files folder
			combine_text_files "$subfolder"
			echo "Combined text files in $subfolder/nano_files into $subfolder/nano_files/combined_output.txt"
		else
			echo "Skipping $subfolder as it does not contain a nano_files directory."
		fi
	done
done

echo "All applicable text files have been combined."
