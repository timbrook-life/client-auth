# vault {
#   address = "http://vault.core.svc.cluster.local:8200"
#   ssl {
#     # This is terrible practice, will fix
#     enabled = false
#     verify = false
#   }
#   vault_agent_token_file = "/var/run/secrets/.vault-token"
#   renew_token = true
# }

consul {
  # Config this differently for dev?
  address = "http://localhost:8500"
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