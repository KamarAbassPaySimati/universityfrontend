import pandas as pd

def excel_to_sql_inserts(excel_file, sheet_name, table_name):
    # Read Excel file
    df = pd.read_excel(excel_file, sheet_name=sheet_name)
    
    # Generate INSERT statements
    sql_statements = []
    
    for index, row in df.iterrows():
        columns = ', '.join(df.columns)
        values = ', '.join([f"'{str(val)}'" if pd.notna(val) else 'NULL' for val in row])
        
        sql = f"INSERT INTO {table_name} ({columns}) VALUES ({values});"
        sql_statements.append(sql)
    
    # Write to SQL file
    with open(f'{table_name}_inserts.sql', 'w') as f:
        f.write('\n'.join(sql_statements))
    
    print(f"Generated {len(sql_statements)} INSERT statements for {table_name}")

# Usage examples:
# excel_to_sql_inserts('university_data.xlsx', 'Students', 'students')
# excel_to_sql_inserts('university_data.xlsx', 'Courses', 'courses')
# excel_to_sql_inserts('university_data.xlsx', 'Grades', 'grades')