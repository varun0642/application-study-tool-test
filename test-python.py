import os
import subprocess
import tempfile

# Vulnerability: Hardcoded credentials
username = "admin"
password = "SuperSecretPassword123"

def unsafe_file_access():
    # Vulnerability: Using world-writable file permissions
    with open("sensitive_data.txt", "w") as f:
        f.write("This is sensitive data!")

def unsafe_shell_command(user_input):
    # Vulnerability: Using unsanitized shell commands
    subprocess.run(f"ls {user_input}", shell=True)

def insecure_temp_file():
    # Vulnerability: Creating insecure temporary files
    temp = tempfile.NamedTemporaryFile(delete=False)
    temp.write(b"Insecure data")
    temp.close()

def sql_injection_vulnerable(query_param):
    # Vulnerability: SQL injection (unsanitized user input)
    query = f"SELECT * FROM users WHERE username = '{query_param}'"
    print(query) # SQL injection example

def use_of_unverified_ssl():
    # Vulnerability: Ignoring certificate validation for HTTPS
    import requests
    requests.get("https://example.com", verify=False)

def unsafe_eval(user_input):
    # Vulnerability: Eval usage allows arbitrary code execution
    eval(user_input)

def weak_random_number():
    # Vulnerability: Use of insufficiently random number
    import random
    print(random.random())

def main():
    # Execute functions with vulnerable code
    unsafe_file_access()
    unsafe_shell_command("../")
    insecure_temp_file()
    sql_injection_vulnerable("admin' OR '1'='1")
    use_of_unverified_ssl()
    unsafe_eval("__import__('os').system('cat /etc/passwd')")
    weak_random_number()

if __name__ == "__main__":
    main()
