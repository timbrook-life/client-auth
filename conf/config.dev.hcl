vault {
  address = "https://vault.timbrook.dev"
  ssl {
    enabled = true
    verify = true
  }
  renew_token = false
}

consul {
  address = "https://consul.timbrook.dev"
}

###
# Application Templates live here 
#

template {
    destination = "./server/api/configuration/config.json"
    source = "./conf/templates/config.json"
    error_on_missing_key = true
    left_delimiter  = "(("
    right_delimiter = "))"
}

template {
    destination = "/var/run/secrets/jwk.json"
    source = "./conf/templates/jwk.json"
    error_on_missing_key = true
}

exec {
  command = "npm run dev"
  splay = "2s"

  env {
    pristine = false
  }
  // reload_signal = "SIGHUP"
  kill_signal = "SIGINT"
  kill_timeout = "2s"
}