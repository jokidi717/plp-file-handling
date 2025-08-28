def modify_file(input_filename, output_filename):
    try:
        # Try to open and read the input file
        with open(input_filename, "r") as infile:
            content = infile.read()

        # Modify content (example: make everything uppercase)
        modified_content = content.upper()

        # Write modified content into a new file
        with open(output_filename, "w") as outfile:
            outfile.write(modified_content)

        print(f"✅ Successfully created '{output_filename}' with modified content.")

    except FileNotFoundError:
        print(f" Error: The file '{input_filename}' does not exist.")
    except PermissionError:
        print(f" Error: You don’t have permission to read '{input_filename}'.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# Ask user for file names
input_file = input("Enter the name of the file to read: ")
output_file = input("Enter the name of the file to write modified content: ")

# Call the function
modify_file(input_file, output_file)
