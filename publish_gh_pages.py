import os
import subprocess
import shutil

repo_dir = os.path.dirname(os.path.abspath(__file__))
dist_dir = os.path.join(repo_dir, "dist")

print("Building production bundle with Vite...")
subprocess.run(["npm", "run", "build"], cwd=repo_dir, check=True, shell=True)

if not os.path.exists(dist_dir):
    print("Error: dist folder not found after build.")
    exit(1)

git_in_dist = os.path.join(dist_dir, ".git")
if os.path.exists(git_in_dist):
    shutil.rmtree(git_in_dist, ignore_errors=True)

with open(os.path.join(dist_dir, ".nojekyll"), "w", encoding="utf-8") as f:
    f.write("")

print("Preparing gh-pages branch from dist...")
os.chdir(dist_dir)
subprocess.run(["git", "init"], check=True)
subprocess.run(["git", "config", "user.email", "contacto@lisarstudio.com"], check=True)
subprocess.run(["git", "config", "user.name", "Lisar Studio"], check=True)
subprocess.run(["git", "add", "-A"], check=True)
subprocess.run(["git", "commit", "-m", "Deploy Corona de Flores live demo to GitHub Pages"], check=True)
subprocess.run(["git", "branch", "-M", "gh-pages"], check=True)
subprocess.run(["git", "remote", "add", "origin", "https://github.com/LisarStudio/lisarstudio-demo.git"], check=True)

print("Force pushing dist to gh-pages...")
subprocess.run(["git", "push", "-f", "origin", "gh-pages"], check=True)
print("Deployment to GitHub Pages successfully completed!")

