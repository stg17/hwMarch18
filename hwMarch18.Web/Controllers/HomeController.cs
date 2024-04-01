using hwMarch18.Data;
using hwMarch18.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace hwMarch18.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress;Initial Catalog=People; Integrated Security=true;";
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            var repo = new PeopleRepository(_connectionString);
            var people = repo.GetPeople();
            return Json(people);
        }

        [HttpPost]
        public IActionResult AddPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.AddPerson(person);
            return Json(person);
        }

        [HttpPost]
        public IActionResult DeletePerson(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeletePerson(id);
            return Json("deleted!");
        }

        [HttpPost]
        public IActionResult EditPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.EditPerson(person);
            return Json("updated!");
        }

        public IActionResult GetPersonById(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            return Json(repo.GetPersonById(id));
        }
    }
}
