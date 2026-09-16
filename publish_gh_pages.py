import os
import subprocess
import shutil

repo_dir = r"C:\Users\peter\.gemini\antigravity-ide\scratch\lisarstudio-demo"
dist_dir = os.path.join(repo_dir, "dist")
git_in_dist = os.path.join(dist_dir, ".git")

if not os.path.exists(dist_dir):
    print("dist folder not found. Run npm run build first.")
    exit(1)

if os.path.exists(git_in_dist):
    shutil.rmtree(git_in_dist, ignore_errors=True)

print("Preparing gh-pages deployment...")

# Write .nojekyll in dist
with open(os.path.join(dist_dir, ".nojekyll"), "w") as f:
    f.write("")

# Change working directory to dist
os.chdir(dist_dir)

# Initialize temporary git repo in dist
subprocess.run(["git", "init"], check=True)
subprocess.run(["git", "config", "user.email", "contacto@lisarstudio.com"], check=True)
subprocess.run(["git", "config", "user.name", "Lisar Studio"], check=True)
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-m", "Deploy Corona de Flores demo white theme to gh-pages"], check=True)
subprocess.run(["git", "branch", "-M", "gh-pages"], check=True)
subprocess.run(["git", "remote", "add", "origin", "https://github.com/LisarStudio/lisarstudio-demo.git"], check=True)

print("Force pushing dist to gh-pages...")
subprocess.run(["git", "push", "-f", "origin", "gh-pages"], check=True)

print("Successfully deployed dist to gh-pages branch!")
