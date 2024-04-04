use std::process::Command;
use std::path::Path;

#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            let resource_path = app.path_resolver().resource_dir().unwrap();
            let backend_path = resource_path.join("backend/backend-adminmuebles.exe");
            let mut command = Command::new(backend_path.to_str().expect("Failed to convert path to string"));

            if let Err(err) = command.spawn() {
                eprintln!("Failed to start backend: {}", err);
                return Err("Failed to start backend".into());
            }
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
